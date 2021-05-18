<template>
    <div class="everydetail" v-if="title">
        <div class="name">{{title}}</div>
        <div class="time">{{time | getTime}}</div>
        <div class="content" v-html="content">
            
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
            title:'',
            time:'',
            content:'',
        }
    },
    created() {
       
    },
    mounted() {
        console.log(this.detailId)
        if(this.detailId){
            let tem = this.detailId.split('_')[0]
            let tem2 = this.detailId.split('_')[1]
            if(tem == '2'){
                this.gethelpdetail(tem2)
            }else{
                this.getBannerdetail(tem2)
            }
        }
    },
    methods: {
        // id 入参是a_b 格式。a 代表类型。0是资讯，1是banner，2是帮助中心
        gethelpdetail(id){
            let _this = this
            var info = new Promise(function(resolve, reject) {
                _this.$axios.get(`${_this.hosts.szjb1}/medical/help/get`,{       
                    params:{
                        medicalHelpId:id
                    }
                }).then(res => {
                    console.log(id,'--帮助详情-->',res)
                    _this.title = res.data.medicalHelp.normalQuestion
                    _this.time = res.data.medicalHelp.updateTime
                    _this.content = res.data.medicalHelp.answerQuestion
                    resolve(res)
                }).catch(e => {
                    console.log(e)
                    resolve([])
                })
            })
            return info;
        },
        getBannerdetail(id){
            let _this = this
            var info = new Promise(function(resolve, reject) {
                _this.$axios.get(`${_this.hosts.szjb1}/medical/news/queryNewsData`,{       
                    params:{
                        medicalNewsId:id
                    }
                }).then(res => {
                    _this.title = res.data.medicalNew.newsTitle
                    _this.time = res.data.medicalNew.updateTime
                    _this.content = res.data.medicalNew.newsText
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
.everydetail{
    background:#FFF;
    padding:0.48rem;
}
.name{
    font-size:0.64rem;
    font-weight:700;
}
.time{
    color:#999;
    font-size:0.48rem;
}
.content{
    font-size:0.58rem;
    margin-top:0.24rem;
}
</style>
