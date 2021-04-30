<template>
    <div>
        <el-form :inline="true" size="small" :model="form">
            <el-form-item label="关键词">
                <el-input
                    placeholder="查询账号、姓名等关键词"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">查询</el-button>
                <el-button type="info">重置</el-button>
                <el-button>添加机构</el-button>
            </el-form-item>
        </el-form>
        <Table />
    </div>
</template>
<script>
    import Table from "./components/groupTable";
    export default {
        components: {
            Table,
        },
        data() {
            return {
                form: {
                    keywords: ""
                },
            };
        },
        methods: {

        },
    };
</script>
<style lang='less' scoped>

</style>
