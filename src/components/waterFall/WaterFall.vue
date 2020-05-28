<template>
  <div class="water-fall">
    <div v-for="(item,index) in waterData" :key="index">
      <div :class="`item${index}`">
        <div v-for="($item,$index) in item" :key="$index">
          <slot name="item" :item="$item"></slot>
        </div>
      </div>
    </div>
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
    return {
      times: 0,
      list: [],
      waterData: []
    };
  },
  computed(){
    // waterData(){
    //   this.updateWaterfall();
    // }
  },
  methods: {
    updateWaterfall() {
      let itemH = [];
      let item = this.data.shift();
      let viewShortIndex = 0;
      if (item == null) {
        return;
      }
      for (let i = 0; i < this.col; i++) {
        if (document.querySelector(".item" + i)) {
          itemH.push(document.querySelector(".item" + i).clientHeight);
        }
      }
      viewShortIndex = itemH.indexOf(Math.min.apply(Math, itemH));
      this.waterData[viewShortIndex].push(item);
      this.$nextTick(function() {
        this.updateWaterfall();
      });
    }
  },
  mounted() {
    this.updateWaterfall();
  },
  created() {
    for (let i = 0; i < this.col; i++) {
      this.waterData.push([]);
    }
  }
};
</script>

<style lang="less" scoped>
.water-fall {
  display: flex;
}
</style>