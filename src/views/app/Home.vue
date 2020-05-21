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
    <van-tabs sticky swipeable animated lazy-render>
      <van-tab v-for="(item,index) in tabList" :title="item.name" :key="item+index">
        
      </van-tab>
    </van-tabs>
    <!-- <router-link to="/home/video" tag="button">video</router-link>
    <router-link to="/home/skill" tag="button">video</router-link> -->
    <!-- <router-link to="/home/video" tag="button">video</router-link>
    <router-link to="/home/recom" tag="button">recom</router-link>-->
    <!-- <router-view/> -->
    <router-link to="/home/recom">推荐</router-link>
    <router-link to="/home/hot">热门</router-link>

    <router-view></router-view>
  </div>
</template>

<script>
import { request } from "@/network/request";

export default {
  name: "Home",
  data() {
    return {
      modelList: {},
      tabList: {},
      path: "/home/recom"
    };
  },
  methods: {
    goSearch() {}
  },
  created() {
    request("/Baidu/v1/Index/recommend").then(res => {
      this.modelList = res;
    });
    request("/Baidu/v1/Index/home").then(res => {
      console.log(res);
      this.tabList = res.tabList;
    });
  },
  destroyed() {
    console.log("home destroyed");
  },
  // 这两个函数, 只有该组件被保持了状态使用了keep-alive时, 才是有效的
  activated() {
    this.$router.push(this.path);
    console.log("activated");
  },
  deactivated() {
    console.log("deactivated");
  },
  beforeRouteLeave(to, from, next) {
    alert(111);
    console.log(this.$route.path);
    this.path = this.$route.path;
    next();
  }
};
</script>

<style lang="less" scoped>
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
}
</style>

