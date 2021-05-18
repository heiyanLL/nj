<template>
    <div class="mybx">
        <div class="placeholder">
            <div class="tab-list-wrap">
                <div class="tab-list helpcenter">
                    <div :class="['item',i==curType?'cur':'']" v-for="(v,i) in typeList" :key="i" @click="diffType(i)"><span>{{v}}</span></div>    
                </div>
            </div>
        </div>
        
        <ul class="bx-list">
            <li v-for="(v,i) in helpList" :key="i" @click="$router.push({path:'/everydetail/2_'+v.medicalHelpId})">
                <div class="title">{{v.normalQuestion}}</div>
                <div class="time">{{v.updateTime | getTime}}</div>
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
            typeList:['全部','职工医保报销','居民医保报销','生育医保报销'],
            curType:0,
            helpList:[]
        }
    },
    created() {
       
    },
    mounted() {
       this.getList('')
    },
    methods: {
        getList(type){
            let _this = this
            var info = new Promise(function(resolve, reject) {
                _this.$axios.get(`${_this.hosts.szjb1}/medical/help/getHelpRecordList`,{       
                    params:{
                        reimburseType:type,
                        param:''
                    }
                }).then(res => {
                    if(res&&res.data&&res.data.helpList){
                        _this.helpList = res.data.helpList
                        resolve(res.data.helpList)
                    }
                }).catch(e => {
                    console.log(e)
                    resolve({})
                })
            });
            return info;
        },
        diffType(i){
            this.curType = i
            let rc = ''
            if(i == '1' || i == '2' || i == '3'){
                rc = i-1
            }
            this.getList(rc)
        }
    },
}
</script>
<style lang='less'>
.helpcenter{
    width:15rem;
    .item{
        width:25%;
        font-size:0.52rem;
        span{
            padding:0 0.12rem;
        }
    }
}
.bx-list{
    background:#FFF;
    padding-top:0.26rem;
    li{
        padding:0.24rem 0;
        margin:0 0.5rem;
        border-bottom:1px solid #F3F3F3;
        .title{
            font-weight:700;
            font-size:0.56rem;
        }
        .time{
            color:#999;
        }
    }
    li:last-child{
        border-bottom:none;
    }
}
</style>
