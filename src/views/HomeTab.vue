<template>
  <div class="home-tab">
    <!-- tab+滚动加载 -->
    <Tabs sticky>
      <Tab
        :title="item.name"
        :name="index"
        v-for="(item,index) in tabList"
        :key="item.name"
        activeColor="red"
        v-model="activeIndex"
        @click="tabChange"
      ></Tab>
    </Tabs>
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
        <div class="dish-item" v-for="item in item" :key="item.code">
          <img
            :src="item.image.url"
            :style="{width:imgWid,height:imgWid*item.image.height/item.image.width}"
          >
          <div class="bottom">
            <div class="title">{{item.title}}</div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { request } from "@/network/request";
import Tabs from "../components/tabs/Tabs";
import Tab from "../components/tabs/Tab";
export default {
  name: "HomeTab",
  components: {
    Tabs,
    Tab
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
      imgWid: 0
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
  },
  mounted() {
    this.$nextTick(() => {
      this.top = document.querySelector(".tabs-wrap").offsetTop;
      this.imgWid =
        3.34 * document.querySelector("html").style.fontSize.split("px")[0];
    });
  }
};
</script>

<style lang="less" scoped>
.dish-wrap {
  width: 100%;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 0 15px;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  min-height: 100vh;

  .dish-item {
    border-radius: 0.1rem;
    box-shadow: 0 0 0.1rem #e6e6e6;
    width: 3.34rem;
    overflow: hidden;
    margin: 10px 0;
  }
  .bottom {
    padding: 0.1rem 0.15rem 0.2rem;
    .title {
      font-size: 0.26rem;
      line-height: 0.36rem;
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>

