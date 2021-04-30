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
                <el-input
                    placeholder="查询账号、姓名等关键词"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">查询</el-button>
                <el-button type="info">重置</el-button>
                <el-button>添加账号</el-button>
            </el-form-item>
        </el-form>
        <Table />
    </div>
</template>
<script>
    import CONST from "~/data/const";
    import Table from "./components/table";
    export default {
        components: {
            Table,
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
            };
        },
        methods: {

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
