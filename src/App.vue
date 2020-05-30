<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <van-tabbar
      v-show="$route.path == '/home' || $route.path == '/classify' || $route.path == '/comment' || $route.path == '/user'"
      v-model="path"
      safe-area-inset-bottom
      placeholder=""
      active-color="#000"
    >
      <van-tabbar-item
        v-for="(item,index) in nav"
        :key="index"
        :to="item.path"
        replace
        :name="item.path"
      >
        <template v-slot:icon="props">
          <img :src="props.active ?  item.icon.active : item.icon.inactive">
        </template>
        <span>{{item.title}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>


<script>
import { GetUrlRelativePath } from "@/assets/js/common";

export default {
  name: "app",
  component: {},
  data: () => {
    return {
      path: "",
      nav: [
        {
          title: "首页",
          path: "/home",
          icon: {
            active: require("assets/images/tabbar/home-active-icon.png"),
            inactive: require("assets/images/tabbar/home-icon.png")
          }
        },
        {
          title: "分类",
          path: "/classify",
          icon: {
            active: require("assets/images/tabbar/classify-active-icon.png"),
            inactive: require("assets/images/tabbar/classify-icon.png")
          }
        },
        {
          title: "消息",
          path: "/comment",
          icon: {
            active: require("assets/images/tabbar/comment-active-icon.png"),
            inactive: require("assets/images/tabbar/comment-icon.png")
          }
        },
        {
          title: "我的",
          path: "/user",
          icon: {
            active: require("assets/images/tabbar/user-active-icon.png"),
            inactive: require("assets/images/tabbar/user-icon.png")
          }
        }
      ]
    };
  },
  methods: {},
  created() {
    //首次进入关联路由和icon状态
    this.path = "/" + GetUrlRelativePath(location.href).split("/")[1];
  }
};
</script>


<style lang="less" scoped>
.van-tabbar-item__icon img {
  height: 25px;
}
</style>
