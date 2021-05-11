<template>
    <div>
        <div>
            <h1>{{objdata.reimburseType=='1'?'居民':(objdata.reimburseType=='0'?'职工':'生育')}}医疗报销{{objdata.reimburseKind=='0'?'（本人报销）':''}}</h1>
            <el-divider></el-divider>
            <div class="personinfo">
                <div class="t1" v-if="objdata.reimbursePeople"><span class="t2">报销人：</span>{{objdata.reimbursePeople}}</div>
                <div class="t1" v-if="objdata.reimbursePeopleSocial"><span class="t2">报销人社保卡：</span><a href="link-img">查看</a></div>
                <!-- <div class="upfile" v-if="objdata.reimbursePeopleSocial">
                    <div class="operation-div">
                        <div class="img-wrap" v-for="(v,i) in objdata.reimbursePeopleSocial.split(',')" :key="i">
                            <img class="shoImg" :src="v | imageUrl">
                        </div>
                    </div>
                </div> -->
                <div class="t1" v-if="objdata.reimburseRelate"><span class="t2">与报销人关系：</span>{{objdata.reimburseRelate}}</div>

                <div class="t1" v-if="objdata.personStreet"><span class="t2">所在街道：</span>{{objdata.personStreet}}</div>
                <div class="t1" v-if="objdata.visitHospitalArea != null"><span class="t2">就诊地：</span>{{objdata.visitHospitalArea=='1'?'异地':'南京'}}</div>
                <div class="t1" v-if="objdata.visitHospitalName"><span class="t2">就诊医院：</span>{{objdata.visitHospitalName}}</div>
                <div class="t1" v-if="objdata.visitType!=null"><span class="t2">就诊类型：</span>{{objdata.visitType=='0'?'住院':'门诊'}}</div>

                <div class="t1" v-if="objdata.declareType != null"><span class="t2">申报类型：</span>{{objdata.declareType=='0'?'生育':'计生'}}</div>
                <div class="t1" v-if="objdata.declareTypeTwo != null"><span class="t2" style="width:6rem;">配偶是否无业无保险：</span>{{objdata.declareType=='0'?'是':'否'}}</div>
                <div class="t1" v-if="objdata.applyName"><span class="t2">申请人姓名：</span>{{objdata.applyName}}</div>
                <div class="t1" v-if="objdata.reimburseUnit"><span class="t2">报销单位：</span>{{objdata.reimburseUnit}}</div>
                <div class="t1" v-if="objdata.companySocialCode"><span class="t2">单位社保代码：</span>{{objdata.companySocialCode}}</div>
                <div class="t1" v-if="objdata.birthHospitalName"><span class="t2">生育医院名称：</span>{{objdata.birthHospitalName}}</div>
                <div class="t1" v-if="objdata.birthBabyNo != null"><span class="t2">生育胎儿数量：</span>{{objdata.birthBabyNo == '0'?'一胎':(objdata.birthBabyNo == '1'?'二胎':'二胎以上')}}</div>
            </div>
            <div class="dash-line"></div>
            <div class="htwo">报销材料</div>
            <div class="personinfo">
                <div class="t1" v-if="objdata.marriageCertificate"><span class="t2">结婚证/离婚证：</span><a href="link-img">查看</a></div>
            
                <div class="t1" v-if="objdata.medicalRecord"><span class="t2">出院小结/门诊病历：</span><a href="link-img">查看</a></div>
            
                <div class="t1" v-if="objdata.childbirthReceipt"><span class="t2">产检/分娩发票：</span><a href="link-img">查看</a></div>
            
                <div class="t1" v-if="objdata.womanCertificate"><span class="t2">女方无业证明/创就业登记证：</span><a href="link-img">查看</a></div>
            
                <div class="t1" v-if="objdata.pregnancyPermit"><span class="t2">准生证：</span><a href="link-img">查看</a></div>
        
                <div class="t1" v-if="objdata.birthPaymenReceipt"><span class="t2">计生费用发票：</span><a href="link-img">查看</a></div>

                <div class="t1" v-if="objdata.menMedicalRecords"><span class="t2">门慢门特病例：</span><a href="link-img">查看</a></div>
            
                <div class="t1" v-if="objdata.uploadPaymentDetail"><span class="t2">上传费用明细：</span><a href="link-img">查看</a></div>
                
                
                <div class="t1" v-if="objdata.paymentPic"><span class="t2">缴费凭条：</span><a href="link-img">查看</a></div>
                
                <div class="t1" v-if="objdata.visitReceipt"><span class="t2">就诊发票：</span><a href="link-img">查看</a></div>
                
                <div class="t1" v-if="objdata.visitEndRecord"><span class="t2">就诊出院记录：</span><a href="link-img">查看</a></div>
            </div>
            <div class="dash-line"></div>
            <div class="htwo">报销支付方式</div>
            <div class="personinfo">
                <div class="t1" v-if="objdata.reimbursePayType"><span class="t2">报销支付方式：</span>{{objdata.reimbursePayType=='0'?'社保卡':'银行卡'}}</div>
                <div class="t1" v-if="objdata.bankCountry"><span class="t2">开户行：</span>{{objdata.bankCountry+objdata.bankCity}}</div>
                <div class="t1" v-if="objdata.bankName"><span class="t2">银行名称：</span>{{objdata.bankName}}</div>
                <div class="t1" v-if="objdata.backNo"><span class="t2">卡号：</span>{{objdata.backNo}}</div>
                <div class="t1"><span class="t2">申请日期：</span>{{formatter(objdata.createTime)}}</div>
            </div>
        </div>
        
        <div class="form-wraper">
            <h1>报销审核</h1>
            <el-form
                :model="form"
                ref="auditForm"
                label-width="80px"
                size="small"
                v-if="objdata.verifyStatus == '0'|| objdata.verifyStatus == '1'||objdata.verifyStatus == null"
            >
                <el-form-item label="审核结果">
                    <el-radio-group v-model="form.auditResult">
                        <el-radio label="2">通过</el-radio>
                        <el-radio label="1">不通过</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="发票类型">
                    <el-radio-group v-model="form.bill">
                        <el-radio label="0">电子发票</el-radio>
                        <el-radio label="1">纸质发票</el-radio>
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
            <div class="verify-result" v-else>
                <div class="t1" >审核结果：<span v-if="objdata.verifyStatus=='1'">初审成功</span><span v-if="objdata.verifyStatus=='2'">初审失败</span><span v-if="objdata.verifyStatus=='3'">复审成功</span><span v-if="objdata.verifyStatus=='4'">复审失败</span></div>
                <div class="t1" v-if="objdata.verifyName&&objdata.street">{{objdata.verifyName}}-{{objdata.street}}</div>
                <div class="t1" v-if="objdata.receiptType">发票类型：{{objdata.receiptType == '0'?'电子发票':'普通发票'}}</div>
                <div class="t1" v-if="objdata.verifyRemark">审核意见：{{objdata.verifyRemark}}</div>
            </div>
        </div>
        
    </div>
</template>
<script>
    import { dateFormat } from "@/utils/tool";
    export default {
        data() {
            return {
                detailId: this.$route.params.id,
                form: {
                    auditResult: "2",
                    bill: "0",
                    remark: "",
                },
                objdata:{}
            };
        },
        mounted(){
            this.getBxDetail()
        },
        methods: {
            onSubmit() {
                let param = {
                    verifyType:this.objdata.verifyStatus,
                    verifyResult:this.form.auditResult,
                    receiptType:this.form.bill,
                    verifyRemark:this.form.remark,
                    verifyName:'管理员',//this.user.accountName || '管理员',
                    verifyAccount:'admin',//this.user.loginAccount || 'admin',
                    reimburseId:this.detailId
                }
                this.$http.submitVeryfyData(param).then((res)=>{
                    this.objdata = res
                    this.$router.go(-1);
                })
            },
            getBxDetail() {
                let param = {
                    medicalReimburseId:this.detailId
                }
                this.$http.getVerifyDetail(param).then((res)=>{
                    this.objdata = res
                })
            },
            formatter(row) {
                return dateFormat("YYYY-mm-dd HH:MM", row);
            }
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
    .personinfo{
        overflow:hidden;
        .t1{
            width:33.3%;
            float:left;
            margin-bottom:15px;
        }
    }
    .htwo{
        margin-bottom:20px;
        font-weight:700;
        font-size:15px;
    }
    .verify-result{
        margin-top:20px;
        .t1{
            margin-bottom:15px;
        }
    }
</style>
