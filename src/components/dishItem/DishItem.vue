<template>
  <div class="dish-item">
    <img
      :src="item.image.url"
    >
    <div class="bottom">
      <div class="title">{{item.index}}{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DishItem",
  props: {
    item: {
      type: Object
    },
    index: {
      type:Number
    }
  }
};
</script>

<style lang="less" scoped>
.dish-item {
  border-radius: 0.1rem;
  box-shadow: 0 0 0.1rem #e6e6e6;
  width: 100%;
  overflow: hidden;
  .bottom {
    padding: 0.1rem 0.15rem 0.2rem;
    .title {
      font-size: 0.26rem;
      line-height: 0.36rem;
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>

