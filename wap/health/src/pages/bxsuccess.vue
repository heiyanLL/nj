<template>
    <div class="bxsuccess">
        <a href="javascript:;" class="goback" @click="$router.push({path:'/homepage'})">返回首页</a>
        <div class="suc-wrap">
            <em class="icon"></em>
            <div class="title">申报完成</div>
            <div class="des">我们将尽快审核,审核结果在"我的报销"中查看</div>
        </div>
        <a href="javascript:;" class="btn">查看详情</a>
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
    .btn{
        width:4rem;
        height:1.5rem;
        border-radius:1.5rem;
    }
    
}
</style>
