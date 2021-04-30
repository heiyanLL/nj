<template>
    <div>
        <el-form :inline="true" size="small" :model="form">
            <el-form-item label="状态">
                <el-select v-model="form.state" placeholder="请选择发布状态">
                    <el-option
                        v-for="item in stateList"
                        :key="item.name"
                        :label="item.name"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关键词">
                <el-input
                    placeholder="查询标题名称等关键词"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">查询</el-button>
                <el-button type="info">重置</el-button>
                <el-button>添加咨询</el-button>
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
                stateList: CONST.PUBLISH_STATE,
                form: {
                    state: "",
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
