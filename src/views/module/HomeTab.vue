<template>
  <div class="home-tab">
    <!-- tab+滚动加载 -->
    <tabs sticky>
      <tab
        :title="item.name"
        :name="index"
        v-for="(item,index) in tabList"
        :key="item.name"
        activeColor="red"
        v-model="activeIndex"
        @click="tabChange"
      ></tab>
    </tabs>
    <van-list
      :immediate-check="false"
      :finished="finished[activeIndex]"
      finished-text="没有更多了"
      @load="getRecomData"
      v-for="(item,index) in tabData"
      :key="index"
      v-show="index === activeIndex"
    >
      <div class="dish-wrap">
        <!-- 如果页面只有一个瀑布流 index可不传递 如果多个瀑布流index必传[0,1,2,3] Number类型 -->
        <water-fall :data="item" :index="index"  :col="3">
          <template v-slot:item="props">
            <dish-item :item="props.item" :imgWid="itemW" class="water-item"/>
          </template>
        </water-fall>
      </div>
    </van-list>
  </div>
</template>

<script>
import { request } from "@/network/request";
import Tabs from "@/components/tabs/Tabs";
import Tab from "@/components/tabs/Tab";
import DishItem from "@/components/dishItem/DishItem";
import WaterFall from "@/components/waterFall/WaterFall";
export default {
  name: "HomeTab",
  components: {
    Tabs,
    Tab,
    DishItem,
    WaterFall
  },
  data() {
    return {
      activeIndex: 0,
      tabList: [],
      tabData: [],
      nextUrls: [],
      loading: [],
      finished: [],
      scrollTop: [],
      top: 0,
      itemW:0,
    };
  },
  methods: {
    // tab基础数据及第一屏数据
    getTabData() {
      request("/baidu/v1/index/home?").then(res => {
        this.tabList = res.tabList;
        this.tabList.forEach((item, index) => {
          this.nextUrls[index] = "type=" + this.tabList[index].type;
          this.scrollTop[index] = 0;
          if (item.type == res.type) {
            this.activeIndex = index;
          }
        });
        this.tabData[this.activeIndex] = res.first.list;
        this.$set(
          this.tabData,
          this.activeIndex,
          this.tabData[this.activeIndex]
        );
        this.nextUrls[this.activeIndex] = res.first.nextUrl;
      });
    },
    // 请求推荐数据
    getRecomData() {
      return new Promise(resolve => {
        if (this.loading[this.activeIndex]) return;
        this.loading[this.activeIndex] = true;
        request(
          "/baidu/v1/index/recom?" + this.nextUrls[this.activeIndex] || ""
        ).then(res => {
          this.tabData[this.activeIndex] = [
            ...(this.tabData[this.activeIndex] || []),
            ...res.list
          ];
          this.$set(
            this.tabData,
            this.activeIndex,
            this.tabData[this.activeIndex]
          );
          this.tabData[this.activeIndex].forEach((item, index) => {
            this.tabData[this.activeIndex][index].index = index;
          });
          this.nextUrls[this.activeIndex] = res.nextUrl;
          this.loading[this.activeIndex] = false;
          resolve();
        });
      });
    },
    // tab切换
    tabChange(name) {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop >= this.top) {
        this.scrollTop.forEach((item, index) => {
          if (item < this.top) {
            this.scrollTop[index] = this.top;
          }
        });
      } else {
        this.scrollTop.forEach((item, index) => {
          if (item >= this.top) {
            this.scrollTop[index] = scrollTop;
          }
        });
      }
      this.scrollTop[this.activeIndex] = scrollTop;
      this.activeIndex = name;
      if (!this.tabData[this.activeIndex]) {
        this.getRecomData().then(() => {
          this.$nextTick(() => {
            window.scroll(0, this.scrollTop[this.activeIndex]);
          });
        });
      } else {
        this.$nextTick(() => {
          window.scroll(0, this.scrollTop[this.activeIndex]);
        });
      }
    }
  },
  created() {
    this.getTabData();
    this.itemW = 2.2 * document.documentElement.getBoundingClientRect().width / 7.5;
  },
  mounted() {
    this.$nextTick(() => {
      this.top = document.querySelector(".tabs-wrap").offsetTop;
    });
  }
};
</script>

<style lang="less" scoped>
.dish-wrap {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.3rem;
  min-height: 100vh;
  .water-item {
    width: 2.2rem;
    margin: 0.22rem 0;
  }
}
</style>

