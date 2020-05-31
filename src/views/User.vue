<template>
  <div class="user">
    {{$store.state.userInfo}}
  </div>
</template>

<script>
import store from '../store';
export default {
  name: 'User',
  created(){
    console.log(store.state.userInfo.code);
  }
}
</script>

<style lang="less">

</style>

