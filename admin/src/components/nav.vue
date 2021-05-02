<template>
  <div class="nav-wraper">
    <el-menu
      :default-active="active"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#ffffff"
      active-text-colo="#1989fa"
      :collapse="isCollapse"
      :unique-opene="true"
      :router="true"
    >
      <el-submenu
        v-for="(item, index) in menuList"
        :key="index"
        :index="'' + index"
      >
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{ item.name }}</span>
        </template>
        <template v-if="item.children">
          <el-menu-item
            v-for="(child, i) in item.children"
            :key="i"
            :index="resolvePath(item.path, child.path)"
            >{{ child.name }}</el-menu-item
          >
        </template>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import CONST from "@/data/const";
export default {
  name: "Nav",
  data() {
    return {
      isCollapse: false,
      menuList: CONST.NAV,
      active: ''
    };
  },
  created() {
      this.active = this.$route.path
    // this.menuList = this.$router.options.routes
  },
  methods: {
    resolvePath(base, path) {
      return base == "/" ? base + path : `${base}/${path}`;
    },
  },
};
</script>
<style lang='less' scoped>
.nav-wraper {
  height: 100%;
  /deep/ .el-menu {
    height: 100%;
  }
}
</style>
