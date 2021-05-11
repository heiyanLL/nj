<template>
    <div class="bxdetail">
        <div :class="['bxde-name',objdata.verifyRemark?'bottom-none':''] "><span class="bxde-type">{{objdata.reimburseType=='1'?'居民':(objdata.reimburseType=='0'?'职工':'生育')}}医疗报销</span> <span class="bxde-state s1">审核中</span></div>
        <div class="verifyRemark" v-if="objdata.verifyRemark">{{objdata.verifyRemark}}</div>
        <div class="bxde-info">
            <div class="attr-wrap"><div class="bxde-attr gray6">报销人信息</div></div>
            <div class="t1" v-if="objdata.reimbursePeople"><span class="t2">报销人</span>{{objdata.reimbursePeople}}</div>
            <div class="t1 bottom-none" v-if="objdata.reimbursePeopleSocial"><span class="t2">报销人社保卡</span></div>
            <div class="upfile" v-if="objdata.reimbursePeopleSocial">
                <div class="operation-div">
                    <div class="img-wrap" v-for="(v,i) in objdata.reimbursePeopleSocial.split(',')" :key="i">
                        <img class="shoImg" :src="v | imageUrl">
                    </div>
                </div>
            </div>
            <div class="t1" v-if="objdata.reimburseRelate"><span class="t2">与报销人关系</span>{{objdata.reimburseRelate}}</div>

            <div class="t1" v-if="objdata.personStreet"><span class="t2">所在街道</span>{{objdata.personStreet}}</div>
            <div class="t1" v-if="objdata.visitHospitalArea != null"><span class="t2">就诊地</span>{{objdata.visitHospitalArea=='1'?'异地':'南京'}}</div>
            <div class="t1" v-if="objdata.visitHospitalName"><span class="t2">就诊医院</span>{{objdata.visitHospitalName}}</div>
            <div class="t1" v-if="objdata.visitType!=null"><span class="t2">就诊类型</span>{{objdata.visitType=='0'?'住院':'门诊'}}</div>

            <div class="t1" v-if="objdata.declareType != null"><span class="t2">申报类型</span>{{objdata.declareType=='0'?'生育':'计生'}}</div>
            <div class="t1" v-if="objdata.declareTypeTwo != null"><span class="t2" style="width:6rem;">配偶是否无业无保险</span>{{objdata.declareType=='0'?'是':'否'}}</div>
            <div class="t1" v-if="objdata.applyName"><span class="t2">申请人姓名</span>{{objdata.applyName}}</div>
            <div class="t1" v-if="objdata.reimburseUnit"><span class="t2">报销单位</span>{{objdata.reimburseUnit}}</div>
            <div class="t1" v-if="objdata.companySocialCode"><span class="t2">单位社保代码</span>{{objdata.companySocialCode}}</div>
            <div class="t1" v-if="objdata.birthHospitalName"><span class="t2">生育医院名称</span>{{objdata.birthHospitalName}}</div>
            <div class="t1" v-if="objdata.birthBabyNo != null"><span class="t2">生育胎儿数量</span>{{objdata.birthBabyNo == '0'?'一胎':(objdata.birthBabyNo == '1'?'二胎':'二胎以上')}}</div>
            
            
            <div class="attr-wrap"><div class="bxde-attr gray6">报销资料</div></div>

            <div class="t1 bottom-none" v-if="objdata.marriageCertificate"><span class="t2">结婚证/离婚证</span></div>
            <div class="upfile" v-if="objdata.marriageCertificate">
                <div class="operation-div">
                    <div class="img-wrap" v-for="(v,i) in objdata.marriageCertificate.split(',')" :key="i">
                        <img class="shoImg" :src="v | imageUrl">
                    </div>
                </div>
            </div>
            <div class="t1 bottom-none" v-if="objdata.medicalRecord"><span class="t2">出院小结/门诊病历</span></div>
            <div class="upfile" v-if="objdata.medicalRecord">
                <div class="operation-div">
                    <div class="img-wrap" v-for="(v,i) in objdata.medicalRecord.split(',')" :key="i">
                        <img class="shoImg" :src="v | imageUrl">
                    </div>
                </div>
            </div>
            <div class="t1 bottom-none" v-if="objdata.childbirthReceipt"><span class="t2">产检/分娩发票</span></div>
            <div class="upfile" v-if="objdata.childbirthReceipt">
                <div class="operation-div">
                    <div class="img-wrap" v-for="(v,i) in objdata.childbirthReceipt.split(',')" :key="i">
                        <img class="shoImg" :src="v | imageUrl">
                    </div>
                </div>
            </div>
            <div class="t1 bottom-none" v-if="objdata.womanCertificate"><span class="t2">女方无业证明/创就业登记证</span></div>
             <div class="upfile" v-if="objdata.womanCertificate">
                <div class="operation-div">
                    <div class="img-wrap" v-for="(v,i) in objdata.womanCertificate.split(',')" :key="i">
                        <img class="shoImg" :src="v | imageUrl">
                    </div>
                </div>
            </div>
            <div class="t1 bottom-none" v-if="objdata.pregnancyPermit"><span class="t2">准生证</span></div>
            <div class="upfile" v-if="objdata.pregnancyPermit">
                <div class="operation-div">
                    <div class="img-wrap" v-for="(v,i) in objdata.pregnancyPermit.split(',')" :key="i">
                        <img class="shoImg" :src="v | imageUrl">
                    </div>
                </div>
            </div>
            <div class="t1 bottom-none" v-if="objdata.birthPaymenReceipt"><span class="t2">计生费用发票</span></div>
            <div class="upfile" v-if="objdata.birthPaymenReceipt">
                <div class="operation-div">
                    <div class="img-wrap" v-for="(v,i) in objdata.birthPaymenReceipt.split(',')" :key="i">
                        <img class="shoImg" :src="v | imageUrl">
                    </div>
                </div>
            </div>
            <div class="t1 bottom-none" v-if="objdata.menMedicalRecords"><span class="t2">门慢门特病例</span></div>
            <div class="upfile" v-if="objdata.menMedicalRecords">
                <div class="operation-div">
                    <div class="img-wrap" v-for="(v,i) in objdata.menMedicalRecords.split(',')" :key="i">
                        <img class="shoImg" :src="v | imageUrl">
                    </div>
                </div>
            </div>
            <div class="t1 bottom-none" v-if="objdata.uploadPaymentDetail"><span class="t2">上传费用明细</span></div>
            <div class="upfile" v-if="objdata.uploadPaymentDetail">
                <div class="operation-div">
                    <div class="img-wrap" v-for="(v,i) in objdata.uploadPaymentDetail.split(',')" :key="i">
                        <img class="shoImg" :src="v | imageUrl">
                    </div>
                </div>
            </div>
            
            <div class="t1 bottom-none" v-if="objdata.paymentPic"><span class="t2">缴费凭条</span></div>
            <div class="upfile" v-if="objdata.paymentPic">
                <div class="operation-div">
                    <div class="img-wrap" v-for="(v,i) in objdata.paymentPic.split(',')" :key="i">
                        <img class="shoImg" :src="v | imageUrl">
                    </div>
                </div>
            </div>
            <div class="t1" v-if="objdata.visitReceipt"><span class="t2">就诊发票</span></div>
            <div class="upfile" v-if="objdata.visitReceipt">
                <div class="operation-div">
                    <div class="img-wrap" v-for="(v,i) in objdata.visitReceipt.split(',')" :key="i">
                        <img class="shoImg" :src="v | imageUrl">
                    </div>
                </div>
            </div>
            <div class="t1 bottom-none" v-if="objdata.visitEndRecord"><span class="t2">就诊出院记录</span></div>
            <div class="upfile" v-if="objdata.visitEndRecord">
                <div class="operation-div">
                    <div class="img-wrap" v-for="(v,i) in objdata.visitEndRecord.split(',')" :key="i">
                        <img class="shoImg" :src="v | imageUrl">
                    </div>
                </div>
            </div>
            <div class="t1" v-if="objdata.reimbursePayType"><span class="t2">报销支付方式</span>{{objdata.reimbursePayType=='0'?'社保卡':'银行卡'}}</div>
            <div class="t1" v-if="objdata.bankCountry"><span class="t2">开户行</span>{{objdata.bankCountry+objdata.bankCity}}</div>
            <div class="t1" v-if="objdata.bankName"><span class="t2">银行名称</span>{{objdata.bankName}}</div>
            <div class="t1" v-if="objdata.backNo"><span class="t2">卡号</span>{{objdata.backNo}}</div>
            <div class="t1"><span class="t2">申请日期</span>{{objdata.createTime | getTime}}</div>
<!-- "reimburseCardNo": null,
"reimbursePhone": null, -->
<!-- "reimbursePeopleSex": null, -->
        </div>
    </div>
</template>

<script>
export default {
    name: "mybx",
    components: {
    },
    data() {
        return {
            detailId: this.$route.params.id,
            objdata:{}
        }
    },
    created() {
       
    },
    mounted() {
        this.getDetail().then((res)=>{
            this.objdata = res.data
        })
    },
    methods: {
        getDetail(){
            let _this = this
            var info = new Promise(function(resolve, reject) {
                _this.$axios.get(`${_this.hosts.szjb1}/medical/reimburse/doGet`,{       
                    params:{
                        medicalReimburseId:_this.detailId
                    }
                }).then(res => {
                    resolve(res)
                }).catch(e => {
                    console.log(e)
                    resolve([])
                })
            })
            return info;
        }
    }
}
</script>
<style lang='less'>
.verifyRemark{
    color:#969696;
    width:14.04rem;
    margin:0 auto;
}
.bxdetail{
    background:#FFF;
}
.bxde-name{
    position:relative;
    height:1.8rem;
    padding:0 0.48rem;
    line-height:1.8rem;
    border-bottom:1px solid #F3F3F3;
    .bxde-state{
        position:absolute;
        top:50%;
        right:0.64rem;
        width:2.24rem;
        height:0.76rem;
        border-radius:0.76rem;
        margin-top:-0.38rem;
        text-align:center;
        line-height:0.76rem;
        font-size:0.4rem;
    }
    .s1{
        background:rgba(238,132,53,0.2);
        color:rgb(238,132,53)
    }
    .s2{
        background:rgba(26,182,134, 0.2);
        color:rgb(26,182,134)
    }
}
.bxde-type,.bxde-attr{
    color:#333;
    font-size:0.6rem;
    font-weight:700;
}
.bxde-info{
    margin-left:0.48rem;
    margin-bottom:0.24rem;
    .attr-wrap{
        margin-left:-0.48rem;
        border-top:0.24rem solid #F2F2F2;
    }
    .bxde-attr{
        height:1.88rem;
        line-height:1.88rem;
        padding-left:0.48rem;
    }
    .t1{
        height:1.88rem;
        border-bottom:1px solid #F3F3F3;
        line-height:1.88rem;
        font-size:0.48rem;
        color:#646464;
        .t2{
            display: inline-block;
            width:4rem;
            color:#323232;
            white-space:nowrap;
        }
    }
}
</style>
