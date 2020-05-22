<template>
  <div class="video" style="width:100%;height:1000px;">
video
  </div>
</template>

<script>

export default {
  name: 'Video',
  created(){
    console.log('video');
  },
  destroyed() {
    console.log('video-destroy');
  }
}
</script>

<style lang="less">

</style>

