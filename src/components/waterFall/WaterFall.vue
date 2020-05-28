<template>
  <div class="water-fall">
    <div v-for="(item,index) in list" :key="index">
      <div v-for="($item,$index) in item" :key="$index">
        <slot name="item" :item="$item"></slot>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "WaterFall",
  props: {
    data: {
      type: Array
    },
    col: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {};
  },
  computed: {
    list() {
      let list = [];
      for (let i = 0; i < this.col; i++) {
        list.push([]);
      }
      this.data.forEach((item,index)=>{
        list[index%this.col].push(item);
      });
      return list;
    }
  }
};
</script>

<style lang="less" scoped>
.water-fall {
  display: flex;
}
</style>

