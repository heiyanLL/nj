<template>
    <div class="bxdetail">
        <div class="bxde-name"><span class="bxde-type">{{objdata.reimburseType=='0'?'居民':(objdata.reimburseType=='1'?'职工':'生育')}}医疗报销</span> <span class="bxde-state s1">审核中</span></div>
        <div class="bxde-info">
            <div class="attr-wrap"><div class="bxde-attr gray6">报销人信息</div></div>
            <div class="t1" v-if="objdata.reimbursePeople"><span class="t2">报销人:</span>{{objdata.reimbursePeople}}</div>
            <div class="t1" v-if="objdata.personStreet"><span class="t2">所在街道:</span>{{objdata.personStreet}}</div>
            <div class="t1" v-if="objdata.visitHospitalArea"><span class="t2">就诊地:</span>{{objdata.visitHospitalArea}}</div>
            <div class="t1" v-if="objdata.visitHospitalName"><span class="t2">就诊医院:</span>{{objdata.visitHospitalName}}</div>
            <div class="attr-wrap"><div class="bxde-attr gray6">报销资料</div></div>
            <div class="t1" v-if="objdata.paymentPic"><span class="t2">缴费凭条:</span>{{paymentPic}}</div>
            <div class="t1" v-if="objdata.reimbursePayType"><span class="t2">报销支付方式:</span>{{objdata.reimbursePayType=='0'?'社保卡':'银行卡'}}</div>
            
            <div class="t1"><span class="t2">开户行:</span>张张张</div>
            <div class="t1"><span class="t2">银行名称:</span>张张张</div>
            <div class="t1"><span class="t2">卡号:</span>张张张</div>
            <div class="t1"><span class="t2">申请日期:</span>张张张</div>
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
        }
    }
}
</style>
