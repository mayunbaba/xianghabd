<template>
  <div class="login">
login{{$route.params.prepath}}
  </div>
</template>

<script>

export default {
  name: 'Login',
  created(){
    setTimeout(()=>{
      this.$router.push(decodeURIComponent(this.$route.params.prepath));
    },5000);
  }
}
</script>

<style lang="less">

</style>

