<template>
    <div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="待审核" name="auditing"></el-tab-pane>
            <el-tab-pane label="已审核" name="audited"></el-tab-pane>
        </el-tabs>
        <el-form :inline="true" size="small" :model="form" class="demo-form-inline">
            <el-form-item label="报销类型">
                <el-select v-model="form.type" placeholder="请选择报销类型">
                    <el-option
                        v-for="item in typeList"
                        :key="item.name"
                        :label="item.name"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="审核机构">
                <el-select v-model="form.group" placeholder="请选择审核机构">
                    <el-option
                        v-for="item in typeList"
                        :key="item.name"
                        :label="item.name"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="审核结果" v-if="activeName == 'audited'">
                <el-select v-model="form.group" placeholder="请选择审核结果">
                    <el-option
                        v-for="item in resultList"
                        :key="item.name"
                        :label="item.name"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关键词">
                <el-input
                    placeholder="查询申请人、报销人、报销人身份证号等关键词"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">查询</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
        <Table />
    </div>
</template>
<script>
    import CONST from "@/data/const";
    import Table from "./components/auditTable";
    export default {
        components: {
            Table,
        },
        data() {
            return {
                activeName: "auditing",
                typeList: CONST.PAY_TYPE,
                resultList: CONST.AUDIT_RESULT,
                form: {
                    type: "",
                    group: "",
                    result: "",
                    keywords: "",
                },
            };
        },
        created() {
            this.$api.mock().then(data => {
                console.log(data, 111)
            })
        },
        methods: {
            handleClick() {},
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
