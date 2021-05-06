<template>
    <div>
        <el-form :inline="true" size="small" :model="form">
            <el-form-item label="所属机构">
                <el-select v-model="form.type" placeholder="请选择所属街道">
                    <el-option
                        v-for="item in typeList"
                        :key="item.name"
                        :label="item.name"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="用户角色">
                <el-select v-model="form.group" placeholder="请选择用户角色">
                    <el-option
                        v-for="item in userList"
                        :key="item.name"
                        :label="item.name"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关键词">
                <el-input placeholder="查询账号、姓名等关键词"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">查询</el-button>
                <el-button type="info">重置</el-button>
                <el-button @click="dialogFormVisible = true"
                    >添加账号</el-button
                >
            </el-form-item>
        </el-form>
        <Table @handleTable="handleTable" />
        <Dialog
            :dialogFormVisible="dialogFormVisible"
            :info="roleInfo"
            @handleClose="dialogFormVisible = false"
        />
    </div>
</template>
<script>
    import CONST from "@/data/const";
    import Table from "./components/table";
    import Dialog from "./components/userDialog";
    export default {
        components: {
            Table,
            Dialog,
        },
        data() {
            return {
                typeList: CONST.PAY_TYPE,
                userList: CONST.USER_LIST,
                form: {
                    type: "",
                    group: "",
                    keywords: "",
                },
                dialogFormVisible: false,
                roleInfo: {},
            };
        },
        created() {
            this.queryAccountList()
        },
        methods: {
            queryAccountList() {
                let param = {
                    accountName: 'admin',
                    orgName: '',
                    accountRole: '',
                    param: '',
                    limit: 1,
                    offset: 10
                }
                this.$http.queryAccountList(param)
            },
            handleTable(scope, type) {
                if (type == "edit") {
                    this.roleInfo = scope;
                    this.dialogFormVisible = true;
                } else if (type == "delete") {
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
                } else {
                    this.$confirm("您确定要对15951720555账号密码重置吗？", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消"
                    }).then(() => {
                        this.$message({
                            type: "success",
                            message: "重置成功!",
                        })
                    }).catch(() => {

                    })
                }
            },
        },
    };
</script>
<style lang='less' scoped>
    .el-form {
        text-align: left;
        .el-input {
            width: 330px;
        }
    }
</style>
