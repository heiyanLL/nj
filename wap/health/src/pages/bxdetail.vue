<template>
    <div class="bxdetail">
        <div class="name"><span class="type gray6">居民报销</span> <span class="state">审核中</span></div>
        <div class="info">
            <div class="attr gray6">报销人信息</div>
            <div class="t1"><span class="t2">报销人:</span>张张张</div>
            <div class="t1"><span class="t2">所在街道:</span>张张张</div>
            <div class="t1"><span class="t2">就诊地:</span>张张张</div>
            <div class="t1"><span class="t2">就诊医院:</span>张张张</div>
        </div>
        <div class="info">
            <div class="attr gray6">报销资料</div>
            <div class="t1"><span class="t2">缴费凭条:</span>张张张</div>
            <div class="t1"><span class="t2">报销支付方式:</span>张张张</div>
            <div class="t1"><span class="t2">开户行:</span>张张张</div>
            <div class="t1"><span class="t2">银行名称:</span>张张张</div>
            <div class="t1"><span class="t2">卡号:</span>张张张</div>
        </div>
        <div class="info" style="border-bottom:none;">
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
        }
    },
    created() {
       
    },
    mounted() {
        
    },
    methods: {
        
    }
}
</script>
<style lang='less'>
.bxdetail{
    background:#FFF;
}
.name{
    height:1.8rem;
    padding:0 0.48rem;
    line-height:1.8rem;
    border-bottom:1px solid #DDD;
    .state{
        float:right;
    }
}
.info{
    margin-left:0.48rem;
    padding-left:0.12rem;
    margin-bottom:0.24rem;
    border-bottom:1px solid #DDD;
    .attr{
        height:1.5rem;
        line-height:1.5rem;
        font-size:0.56rem;
    }
    .t1{
        height:1rem;
        line-height:1rem;
        .t2{
            display: inline-block;
            width:5rem;
        }
    }
}
</style>
