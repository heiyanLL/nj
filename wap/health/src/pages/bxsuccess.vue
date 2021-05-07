<template>
    <div class="bxsuccess">
        <a href="javascript:;" class="goback" @click="$router.push({path:'/homepage'})">返回首页</a>
        <div class="suc-wrap">
            <em class="icon"></em>
            <div class="title">申报完成</div>
            <div class="des">我们将尽快审核,审核结果在"<a href="javascript:;" @click="$router.push({path:'/mybx'})">我的报销</a>"中查看</div>
        </div>
        <a href="javascript:;" class="btn" @click="$router.push({path:'/bxdetail/'+detailId})">查看详情</a>
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
.bxsuccess{
    .goback{
        padding-right:0.48rem;
        padding-top:0.48rem;
        display:block;
        text-align:right;
        color:#646464;
        font-size:0.6rem;
    }
    .suc-wrap{
        color:#646464;
        text-align: center;
        .icon{
            display:block;
            width:2rem;
            height:2rem;
            margin:2rem auto 0;
            background:url(data:image/png;base64,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) no-repeat;
            background-size:2rem;
        }
        .des{
            font-size:0.52rem;
            a{
                color:#4873DD;
            }
        }
        .title{
            margin-top:0.48rem;
            font-size:0.6rem;
        }
    }
    
    .btn{
        width:4rem;
        height:1.5rem;
        border-radius:1.5rem;
        background:#4873DD;
        color:#FFF;
        display:block;
        margin:2rem auto 0;
        line-height:1.5rem;
        text-align:center;
        font-size:0.6rem;
    }
    
}
</style>
