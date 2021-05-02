<template>
    <div>
        <div>
            <h1>居民医疗报销（本人报销）</h1>
            <el-divider></el-divider>
            <el-row>
                <el-col :span="8"><label>申请人:</label>刘军</el-col>
                <el-col :span="8"
                    ><label>申请人身份证号:</label>320829199838449929</el-col
                >
                <el-col :span="8"><label>手机号:</label>137739635423</el-col>
            </el-row>
            <el-row>
                <el-col :span="8"><label>报销人:</label>刘军</el-col>
                <el-col :span="8"><label>所在街道:</label>沿江街道</el-col>
                <el-col :span="8"><label>就诊地:</label>南京</el-col>
            </el-row>
            <el-row>
                <el-col :span="8"
                    ><label>就诊医院:</label>南京市浦口医院</el-col
                >
                <el-col :span="8"
                    ><label>申请时间:</label>2020/04/20 18:00:00</el-col
                >
            </el-row>
            <div class="dash-line"></div>
            <el-row><p>报销材料</p></el-row>
            <el-row
                ><label>缴费凭条:</label> <a class="link-img">查看</a></el-row
            >
            <div class="dash-line"></div>
            <el-row><p>报销支付方式</p></el-row>
            <el-row><label>报销支付方式:</label> 社保卡 / 银行卡</el-row>
            <el-row>
                <el-col :span="8"
                    ><label>银行卡号:</label>6226 8888 8888 8888 123</el-col
                >
                <el-col :span="8"><label>开户省市:</label>江苏省南京市</el-col>
                <el-col :span="8"><label>银行名称:</label>江苏银行</el-col>
            </el-row>
        </div>
        <div class="form-wraper">
            <h1>报销审核</h1>
            <el-form
                :model="form"
                ref="auditForm"
                label-width="80px"
                size="small"
            >
                <el-form-item label="审核结果">
                    <el-radio-group v-model="form.auditResult">
                        <el-radio label="通过"></el-radio>
                        <el-radio label="不通过"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="发票类型">
                    <el-radio-group v-model="form.bill">
                        <el-radio label="电子发票"></el-radio>
                        <el-radio label="纸质发票"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input
                        type="textarea"
                        :rows="5"
                        placeholder="请输入内容"
                        v-model="form.remark"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item size="large">
                    <el-button type="primary" @click="onSubmit"
                        >发送</el-button
                    >
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    // import DATA from "./data";
    export default {
        data() {
            return {
                form: {
                    auditResult: "通过",
                    bill: "电子发票",
                    remark: "",
                },
            };
        },
        methods: {
            onSubmit() {},
        }
    };
</script>
<style lang='less' scoped>
    .el-divider--horizontal {
        margin: 16px 0;
    }
    h1 {
        font-size: 20px;
    }
    .el-row {
        margin-bottom: 15px;
    }
    .dash-line {
        border-bottom: 1px dashed #cccccc;
        margin-bottom: 20px;
    }
    .link-img {
        color: blue;
        cursor: pointer;
    }
    .form-wraper {
        margin-top: 50px;
        .el-form {
            margin-top: 20px;
        }
    }
</style>
