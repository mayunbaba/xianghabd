<template>
  <div class="tabs-wrap">
    <div class="tabs" :class="{sticky:sticky,fixed:isFixed}" @click="scroll">
      <slot></slot>
    </div>
    <div class="tabs" v-if="sticky"></div>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  props: {
    sticky: {
      type: Boolean,
      default: false
    },
    recordScroll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isFixed: false,
      offsetTop: 0, //tab距离顶部记录
      scrollTop: 0, //页面滚动条高度
      tabScrollTop: [] //记录子tab滚动条高度
    };
  },
  mounted() {
    if (!this.sticky) return;
    window.addEventListener("scroll", this.initHeight);
    this.$nextTick(() => {
      this.offsetTop = document.querySelector(".tabs-wrap").offsetTop;
    });
  },
  methods: {
    initHeight() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.isFixed = this.scrollTop > this.offsetTop ? true : false;
    },
    scroll() {
      if(this.recordScroll) return;
      if (this.isFixed) {
        window.scroll(0, this.offsetTop);
      }
    }
  },
  destroyed() {
    window.removeEventListener("scroll");
  }
};
</script>

<style lang="less" scoped>
.tabs-wrap {
  position: relative;
  .tabs {
    width: 100%;
    height: 44px;
    display: flex;
    background-color: #ffffff;
    border-bottom: 1px solid #f0f0f0;
    &.sticky {
      position: absolute;
      top: 0;
    }
    &.fixed {
      position: fixed;
    }
  }
}
</style>
