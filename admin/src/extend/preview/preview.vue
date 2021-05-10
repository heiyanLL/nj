<template>
  <div class="preview-container" @click="hide">
    <img :src="src" alt="暂无" />
  </div>
</template>

<script>
export default {
  name: "preview",
  data() {
    return {
      src: "",
    };
  },
  methods: {
    hide() {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
  },
};
</script>

<style lang='less' scoped>
.preview-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #00000075;
  z-index: 100;
  img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>