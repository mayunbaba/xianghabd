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
  },
  created() {},
  
};
</script>

<style lang="less">
</style>

