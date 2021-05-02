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
                <el-button @click="dialogFormVisible = true">添加机构</el-button>
            </el-form-item>
        </el-form>
        <Table @handleTable="handleTable"/>
        <groupDialog
            :dialogFormVisible="dialogFormVisible"
            :info="groupInfo"
            @handleClose="dialogFormVisible = false"
        />
    </div>
</template>
<script>
    import Table from "./components/groupTable"
    import groupDialog from "./components/groupDialog"
    export default {
        components: {
            Table,
            groupDialog
        },
        data() {
            return {
                dialogFormVisible: false,
                form: {
                    keywords: ""
                },
                groupInfo:{

                }
            };
        },
        methods: {
            handleTable(scope, type) {
                if(type == 'delete'){
                    this.$confirm("您确定要删除吗？", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    }).then(() => {
                        this.$message({
                            type: "success",
                            message: "删除成功!",
                        })
                    }).catch(() => {

                    })
                }else{
                    this.groupInfo = scope
                    this.dialogFormVisible = true
                }
            }
        },
    };
</script>
<style lang='less' scoped>

</style>
