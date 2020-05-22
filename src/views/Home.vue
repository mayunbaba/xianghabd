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
    <div class="tab-list" v-show="!tabFixed">
      <van-tabs sticky v-model="path" @scroll="scroll" >
        <van-tab v-for="(item,index) in tabList" :title="item.name" :key="item+index" :name="item.path" :to="item.path" repalce>
        </van-tab>
      </van-tabs>
    </div>
    <div class="tab-list fixed" v-show="tabFixed">
      <van-tabs sticky v-model="path" @scroll="scroll" >
        <van-tab v-for="(item,index) in tabList" :title="item.name" :key="item+index" :name="item.path" :to="item.path" repalce>
        </van-tab>
      </van-tabs>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>


  </div>
</template>

<script>
import { request } from "@/network/request";
import {GetUrlRelativePath} from "../assets/js/common";

export default {
  name: "Home",
  data() {
    return {
      modelList: {},
      tabList: [
        {
          "type":1,
          "name":"短视频",
          "path":'/home/video'
        },
        {
          "type":4,
          "name":"小技巧",
          "path":'/home/skill'
        },
        {
          "type":2,
          "name":"热门菜谱",
          "path":'/home/hot'
        },
        {
          "type":11,
          "name":"本周佳作",
          "path":'/home/recom'
        }
      ],
      tabFixed:false,
      path: "",
      tabTop:357,

    };
  },
  methods: {
    goSearch() {},
    scroll(e){
      if(e.scrollTop >= this.tabTop){
        this.tabFixed = true;
      }else{
        this.tabFixed = false;
      }
    },
    initData(){
      request("/Baidu/v1/Index/recommend").then(res => {
        this.modelList = res;
      });
    }
  },
  created() {
    //对应路由和active关系
    this.path = GetUrlRelativePath(location.href);
    this.initData();
  },
  mounted(){
    // setTimeout(()=>{
    //   this.tabTop = document.querySelectorAll('.tab-list')[0].offsetTop
    // },800)
  },
  // 这两个函数, 只有该组件被保持了状态使用了keep-alive时, 才是有效的
  activated() {
    if(this.$route.path !== this.path){
      this.$router.replace(this.path);
    }
  },
  beforeRouteLeave(to, from, next) {
    this.path = this.$route.path;
    next();
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
  .tab-list{
    width: 100%;
    height:.88rem;
    &.fixed{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
    }
    .van-tabs__line{
      width: 47px;
      transform: translateX(47px) translateX(-50%);
    }
  }
}
</style>

