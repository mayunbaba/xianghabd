<template>
  <div class="home">
    <h2>{{$store.state.token}}khjkh</h2>
  </div>
</template>

<script>
import { request } from "@/network/request";

export default {
  name: "Home",
  methods: {
  },
  created() {
    
    request("/Baidu/v1/index/home")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

      request("/Baidu/v1/Index/recommend")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="less">
</style>

