<template>
    <div class="mybx">
        <div class="placeholder">
            <div class="tab-list">
                <div class="item cur">全部</div>    
                <div class="item">居民医保报销</div>    
                <div class="item">职工医保报销</div>    
                <div class="item">生育医保报销</div>    
            </div>
        </div>
        
        <ul class="bx-list">
            <li>
                <div class="title">说明说明说明说明</div>
                <div class="time">2014.12.3</div>
            </li>     
        </ul>    
    </div>
</template>

<script>
export default {
    name: "mybx",
    components: {
    },
    data() {
        return {
            
        }
    },
    created() {
       
    },
    mounted() {
       
    },
    methods: {
        
    },
}
</script>
<style lang='less'>
.placeholder{
    height:1.8rem;
    width:100%;
}
.tab-list{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    overflow:hidden;
    height:1.8rem;
    background:pink;
    .item{
        float:left;
        padding:0 0.35rem;
        text-align:center;
        line-height:1.8rem;
        font-size:0.58rem;
    }
    .item.cur{
        color:red;
        font-weight:700;
    }
}
.bx-list{
    background:#FFF;
    li{
        padding:0.5rem;
        .title{
            font-weight:700;
            font-size:0.56rem;
        }
        .time{
            color:#999;
        }
    }
}
</style>
