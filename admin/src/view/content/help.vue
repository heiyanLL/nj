<template>
    <div>
        <el-form :inline="true" size="small" :model="form">
            <el-form-item label="关键词">
                <el-input
                    placeholder="查询常见问题名称关键词"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">查询</el-button>
                <el-button type="info">重置</el-button>
                <el-button @click="$router.push({path: '/content/help/add'})">添加帮助</el-button>
            </el-form-item>
        </el-form>
        <Table @handleTable="handleTable" />
    </div>
</template>
<script>
    import Table from "./components/helpTable";
    export default {
        components: {
            Table,
        },
        data() {
            return {
                form: {
                    keywords: "",
                },
            };
        },
        methods: {
            handleTable(scope) {
                console.log(scope)
                this.$confirm("您确定要删除吗？", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消"
                    }).then(() => {
                        this.$message({
                            type: "success",
                            message: "删除成功!",
                        })
                    }).catch(() => {

                    })
            }
        },
    };
</script>
<style lang='less' scoped>

</style>
