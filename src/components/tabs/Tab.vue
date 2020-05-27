<template>
  <!--所有的item都展示同一个图片, 同一个文字-->
  <div class="tab" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div class="text-wrap">
      <div>{{title}}</div>
      <div :style="activeStyle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tab",
  props: {
    name: {
      default: 0
    },
    title: {
      type: String
    },
    activeColor: {
      type: String,
      default: "red"
    },
    value: {
      default: 0
    }
  },
  data() {
    return {};
  },
  computed: {
    isActive() {
      return this.name == this.value;
    },
    activeStyle() {
      return this.isActive
        ? {
            position: "absolute",
            bottom: "0",
            left: "50%",
            transform: "translate(-50%,0)",
            width: "47px",
            height: "3px",
            background: this.activeColor
          }
        : {};
    }
  },
  methods: {
    itemClick() {
      this.$emit("click", this.name);
    }
  }
};
</script>

<style  lang="less">
.tab {
  flex: 1;
  text-align: center;
  height: 44px;
  font-size: 14px;
  line-height: 44px;
  img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  .text-wrap {
    position: relative;
  }
}
</style>
