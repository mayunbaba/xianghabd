<template>
  <div class="tabs" @click="clickEvent">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  props: {},
  data() {
    return {
      // active: this.value
    };
  },
  methods: {
    clickEvent() {
      // this.active = 2;
      // this.$emit("click", this.active);
    }
  },
  created() {}
};
</script>

<style lang="less">
.tabs {
  display: flex;
  background-color: #ffffff;
}
</style>

