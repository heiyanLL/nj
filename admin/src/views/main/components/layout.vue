<template>
    <div>
      <el-header>Header</el-header>
        <el-container>
            <el-aside width="200px">
                <Nav />
            </el-aside>
            <el-main>
                <bread-crumb />
                <router-view />
            </el-main>
        </el-container>
    </div>
</template>
<script>
    import Nav from "./nav";
    import breadCrumb from "./breadCrumb";
    export default {
        components: {
            breadCrumb,
            Nav,
        },
        data() {
            return {};
        },
    };
</script>
<style lang='less' scoped>
 .el-header {
        background-color: #545c64;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    .el-aside {
        min-height: calc(100vh - 60px);
    }
    .el-main{
        text-align: left;
    }
</style>
