<template>
    <div>
        <el-tabs v-model="verifyStatus" @tab-click="handleClick">
            <el-tab-pane label="待审核" name="0"></el-tab-pane>
            <el-tab-pane label="已审核" name="1"></el-tab-pane>
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
            <el-form-item label="所属机构">
                <el-select v-model="form.group" placeholder="请选择所属机构">
                    <el-option
                        v-for="item in orgList"
                        :key="item.medicalOrganizationId"
                        :label="item.orgName"
                        :value="item.orgName"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="审核结果" v-if="verifyStatus == 1">
                <el-select v-model="form.result" placeholder="请选择审核结果">
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
                    placeholder="查询申请人、报销人、报销人身份证号等关键词" v-model="form.keywords"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search()">查询</el-button>
                <el-button @click="reset()">重置</el-button>
            </el-form-item>
        </el-form>
        <Table 
            ref="table"
            :verifyList="verifyList"
            :total="total"
            :typs="verifyStatus"
        />
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
                verifyStatus: '0',
                typeList: CONST.PAY_TYPE,
                orgList:[],
                resultList: CONST.AUDIT_RESULT,
                form: {
                    type: "",
                    group: "",
                    result: "",
                    keywords: "",
                },
                verifyList:[],
                total:0,
                limit:0
            };
        },
        created() {
        },
        mounted() {
            this.queryOrgList()
            this.getAuditList()
        },
        methods: {
            reset(){
                this.form.type = ''
                this.form.group = ''
                this.form.result = ''
                this.form.keywords = ''
            },
            search(){
                this.getAuditList()
            },
            handleClick() {
                this.reset()
                this.getAuditList()
            },
            async queryOrgList() {
                let param = {
                    loginAccount: 'admin',//this.user.loginAccount,
                    limit: 0,
                    offset: 100
                }
                let res = await this.$http.queryOrgList(param);
                if (res && res.orgList) {
                    this.orgList = res.orgList;
                }
            },
            getAuditList() {
                let param = {
                    loginAccount: 'admin',
                    verifyStatus: this.verifyStatus,
                    reimburseType: this.form.type,
                    personStreet: this.form.group,
                    verifyResult: this.form.result,
                    limit: this.limit,
                    offset:  this.$refs.table.offset,
                    param: ''
                }
                this.$http.describeVerifyList(param).then((res)=>{
                    this.verifyList = res&&res.reimburseList
                    this.total = res.size;
                })
            }
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
