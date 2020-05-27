<template>
  <div class="home">
    <!-- 顶部基础信息 -->
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
    <HomeTab/>
  </div>
</template>

<script>
import { request } from "@/network/request";
import HomeTab from "./home/HomeTab";

export default {
  name: "Home",
  components: {
    HomeTab
  },
  data() {
    return {
      modelList: {},
      scroll: {
        x: 0,
        y: 0
      }
    };
  },
  methods: {
    goSearch() {},
    // 主页数据
    initData() {
      request("/baidu/v1/index/recommend").then(res => {
        this.modelList = res;
      });
    }
  },
  created() {
    this.initData();
  },
  activated() {
    setTimeout(() => {
      window.scroll(this.scroll.x, this.scroll.y);
    }, 0);
  },

  beforeRouteLeave(to, from, next) {
    this.scroll = {
      x: document.documentElement.scrollLeft,
      y: document.documentElement.scrollTop
    };
    next();
  }
};
</script>

<style lang="less" scoped>
.home {
  background-color: #fff;
  .top {
    border-bottom: 0.1rem solid #f3f3f3;
    height: 7.13rem;
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
}
</style>