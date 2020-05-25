<template>
  <div class="home">
    <div class="top">
      <van-search placeholder="搜菜谱、食材" background="#000" disabled @click="goSearch"/>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in modelList.topic" :key="item+index">
          <div class="cover" :style="{backgroundImage: 'url(' + item.img + ')'}">
            <h2>{{item.title}}</h2>
            <h3>{{item.dishNum}}</h3>
          </div>
        </van-swipe-item>
      </van-swipe>
      <div class="nav">
        <div v-for="(item,index) in modelList.nav" :key="item+index" class="item">
          <div class="intro">
            <h4>{{item.text1}}</h4>
            <h5>{{item.text2}}</h5>
          </div>
          <img :src="item.img">
        </div>
      </div>
    </div>
    <van-tabs v-model="activeIndex" animated sticky swipeable @change="tabChange">
      <van-tab :title="item.name" :name="index" v-for="(item,index) in tabList" :key="item.name">
        <div v-for="item in tabData[activeIndex]" :key="item.code">{{item.title}}</div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { request } from "@/network/request";

export default {
  name: "Home",
  data() {
    return {
      activeIndex: 0,
      modelList: {},
      tabList: [],
      tabData: [],
      nextUrls: []
    };
  },
  methods: {
    goSearch() {},
    // 主页数据
    initData() {
      request("/baidu/v1/index/recommend").then(res => {
        this.modelList = res;
      });
    },
    // tab基础数据及首屏数据
    getTabData() {
      request("/baidu/v1/index/home?")
        .then(res => {
          this.tabList = res.tabList;
          return res;
        })
        .then(res => {
          this.tabList.forEach((item, index) => {
            if (item.type == res.type) {
              this.activeIndex = index;
            }
          });
          this.$set(this.tabData, this.activeIndex, res.first.list);
          this.nextUrls[this.activeIndex] = res.first.netUrl;
        });
    },
    // 请求推荐数据
    getRecomData() {
      request("/baidu/v1/index/recom?" + this.nextUrls[this.activeIndex]).then(
        res => {
          this.$set(this.tabData, this.activeIndex, res.list);
        }
      );
    },
    tabChange(name) {
      this.activeIndex = name;
      this.nextUrls[this.activeIndex] =
        "type=" + this.tabList[this.activeIndex].type;
      this.getRecomData();
    }
  },
  created() {
    this.initData();
    this.getTabData();
  }
};
</script>

<style lang="less">
.home {
  .top {
    border-bottom: 0.1rem solid #f3f3f3;
  }
  .cover {
    width: 100%;
    height: 3.75rem;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h2 {
      color: #fff;
      font-size: 0.4rem;
      font-weight: bold;
      text-align: center;
    }
    h3 {
      color: #fff;
      font-size: 0.26rem;
      font-weight: bold;
      text-align: center;
    }
  }
  .nav {
    display: flex;
    justify-content: space-between;
    padding: 0.4rem;
    .item {
      width: 3.24rem;
      height: 1.4rem;
      background-color: #f3f3f3;
      display: flex;
      .intro {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 0.08rem;
        width: 1.44rem;
      }
      h4 {
        font-size: 0.3rem;
        font-weight: bold;
      }
      h5 {
        font-size: 0.24rem;
        color: #999;
      }
      img {
        width: 1.72rem;
        height: 1.4rem;
      }
    }
  }
  .tab-list {
    width: 100%;
    height: 0.88rem;
    &.fixed {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
    }
    .van-tabs__line {
      width: 47px;
      transform: translateX(47px) translateX(-50%);
    }
  }
}
</style>

