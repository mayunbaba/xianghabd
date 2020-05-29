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
    },
    index:{
      type:Number,
      default:0
    }
  },
  data() {
    return {
      times: 0,
      list: [], //每次的增量数据
      waterData: []
    };
  },
  watch: {
    data: {
      handler(newValue, oldValue) {
        this.list = newValue.slice(oldValue.length);
        this.updateWaterfall();
      }
    }
  },
  methods: {
    updateWaterfall() {
      let itemH = [];
      let item = this.list.shift();
      let viewShortIndex = 0;
      if (item == null) {
        return;
      }
      for (let i = 0; i < this.col; i++) {
        if (document.querySelector(".item" + i)) {
          itemH.push(document.querySelectorAll(".item" + i)[this.index].clientHeight);
        }
      }
      viewShortIndex = itemH.indexOf(Math.min.apply(Math, itemH));
      console.log(itemH, viewShortIndex, item.title);
      this.waterData[viewShortIndex].push(item);
      this.$nextTick(()=> {
        this.updateWaterfall();
      });
    }
  },
  created() {
    for (let i = 0; i < this.col; i++) {
      this.waterData.push([]);
    }
    this.list = JSON.parse(JSON.stringify(this.data));
    this.$nextTick(() => {
      this.updateWaterfall();
    });
  }
};
</script>

<style lang="less" scoped>
.water-fall {
  display: flex;
}
</style>