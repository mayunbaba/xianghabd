<template>
  <div class="classify">classify</div>
</template>

<script>
export default {
  name: "Classify",
  data() {
    return {
      scroll: {
        x: 0,
        y: 0
      }
    };
  },
  activated() {
    this.$parent.path = this.$route.path;
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
  },
  created() {},
  
};
</script>

<style lang="less">
</style>

