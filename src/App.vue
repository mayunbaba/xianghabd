<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <van-tabbar route active-color='#000'>
      <van-tabbar-item v-for="(item,index) in nav" :key="index" :to="item.path" replace>
        <template #icon="props">
          <img :src="props.active ?  item.icon.active : item.icon.inactive">
        </template>
        <span>{{item.title}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  name: "app",
  component: {},
  data: () => {
    return {
      nav: [
        {
          title: "首页",
          path:'/home',
          icon: {
            active: require("assets/images/tabbar/home-active-icon.png"),
            inactive: require("assets/images/tabbar/home-icon.png")
          }
        },
        {
          title: "分类",
          path:'/classify',
          icon: {
            active: require("assets/images/tabbar/classify-active-icon.png"),
            inactive: require("assets/images/tabbar/classify-icon.png")
          }
        },
        {
          title: "消息",
          path:'/comment',
          icon: {
            active: require("assets/images/tabbar/comment-active-icon.png"),
            inactive: require("assets/images/tabbar/comment-icon.png")
          }
        },
        {
          title: "我的",
          path:'/user',
          icon: {
            active: require("assets/images/tabbar/user-active-icon.png"),
            inactive: require("assets/images/tabbar/user-icon.png")
          }
        },
      ],
    };
  }
};
</script>


<style lang="less" scoped>
.van-tabbar-item__icon img{
  height: 25px;
}
</style>
