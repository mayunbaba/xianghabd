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
      list:[],
    };
  },
  methods: {},
  computed: {
    waterData() {
      let list = [];
      for (let i = 0; i < this.col; i++) {
        list.push([]);
      }
      console.log(list, "list");
      this.data.forEach((item, index) => {
        list[index % this.col].push(item);
      });
      let itemH = [];
      this.$nextTick(() => {
        this.times++;
        for (let i = 0; i < this.col; i++) {
          if (document.querySelector(".item" + i)) {
            itemH.push(document.querySelector(".item" + i).clientHeight);
          }
        }
        let len = JSON.parse(JSON.stringify(itemH)).sort((a, b) => a - b);

        console.log(itemH, len);
        console.log(len[len.length - 1] - len[0]);
        // if (len[len.length - 1] - len[0] > 186) {
        //   let min = itemH.indexOf(len[0]);
        //   let max = itemH.indexOf(len[len.length - 1]);
        //   console.log(min, max);
        //   if (this.times > 1) return;
        //   list[min].push(list[max].pop());
        //   console.log(list);
        //   this.list = list;
        // }
      });
      return list;
    }
  },
  created() {
  }
};
</script>

<style lang="less" scoped>
.water-fall {
  display: flex;
}
</style>