<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in bread" :key="item.name">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
    export default {
        name: "breadCrumb",
        data() {
            return {
              bread: []
            }
        },
        watch: {
            $route(to) {
                this.bread = to.matched
            }
        },
        created() {
          this.bread = this.$route.matched
        }
    };
</script>
<style lang='less' scoped>
/deep/ .el-breadcrumb{
    margin-bottom: 20px;
}
</style>
