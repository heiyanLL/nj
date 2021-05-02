<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in bread" :key="item.name"><router-link :to="item.src || ''">{{item.name}}</router-link></el-breadcrumb-item>
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
                this.bread = to.meta && [...to.meta.bread, {name: to.name}] || []
            }
        },
        created() {
          this.bread = this.$route.meta && [...this.$route.meta.bread, {name: this.$route.name}] || []
        }
    };
</script>
<style lang='less' scoped>
/deep/ .el-breadcrumb{
    margin-bottom: 20px;
}
</style>
