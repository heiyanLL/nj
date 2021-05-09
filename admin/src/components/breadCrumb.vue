<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in bread" :key="item.name"><router-link :to="item.src || ''">{{item.title}}</router-link></el-breadcrumb-item>
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
                this.bread = to.meta && [...to.meta.bread, {title: to.meta.title}] || []
            }
        },
        created() {
          this.bread = this.$route.meta && [...this.$route.meta.bread, {title: this.$route.meta.title}] || []
        }
    };
</script>
<style lang='less' scoped>
/deep/ .el-breadcrumb{
    margin-bottom: 10px;
    background: #fff;
    height: 50px;
    line-height: 50px;
    padding-left: 30px;
}
</style>
