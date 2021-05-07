<template>
    <div class="homepage">
        <div class="bgcolor"></div> 
        <div class="banner"><banner v-if="bannerData" :swipeData="bannerData" :swipeOpts="{name:'banner',auto:true}"></banner></div>
        <div class="baoxiao-list hor-view">
            <a href="javascript:;" class="bx1" @click.stop.prevent="gotobaoxiao('jumin')">居民医保报销</a>
            <a href="javascript:;" class="bx2" @click.stop.prevent="gotobaoxiao('zhigong')">职工医保报销</a>
            <a href="javascript:;" class="bx3" @click.stop.prevent="gotobaoxiao('shengyu')">生育医保报销</a>
        </div> 
        <div class="bx-help">
            <a href="" @click.stop.prevent="$router.push({path:'/mybx'})">我的报销<span v-if="reimburseNum!=''">（{{reimburseNum}}）</span></a>
            <a href="" @click.stop.prevent="$router.push({path:'/helpcenter'})">帮助中心</a>
        </div>
        <div class="news-list">
            <div class="title">新闻资讯</div>
            <ul>
                <li v-for="(v,i) in newsData" :key="i">
                    <a href="javascript:;" class="hor-view" @click.stop.prevent="$router.push({path:'/everydetail/0_'+v.medicalNewsId})">
                        <div class="tit">
                            <div class="txt line-clamp-2">{{v.newsTitle}}</div>
                            <div class="time">{{v.publishTime | getTime}}</div>
                        </div>
                        <img :src="v.newsPic" alt="" />
                    </a>
                </li>
            </ul>
        </div>
        <div class="play-info" v-if="protopop">
            <div class="content">
                <div class="title">{{curBxTxt}}报销须知</div>
                <div class="main">{{mainXzTxt}}</div>
                <div class="checkbox" @click="readalready=!readalready"><em :class="['round',readalready?'cur':'']"></em>本人已认真阅读报销须知，并保证提供的报销信息真实、准确、有效。本人自愿承担因提供的个人信息不真实，不准确导致的一切后果。</div>
                <div class="btn">
                    <a href="javascript:;" @click="readalready=false;protopop=false">取消</a>   
                    <a href="javascript:;" :class="[readalready?'cur':'']" @click="agree()">同意</a>   
                </div>
            </div>
        </div>
    </div>
</template> 

<script>
import base64 from "@/utils/base64";
import {banner} from "@/components/components";
export default {
    name: "homepage",
    components: {
        banner
    },
    filters: {
        
    },
    data() {
        return {
            curBxTxt:'',
            mainXzTxt:'',
            bannerData:[],
            newsData:[],
            protopop:false,
            readalready:false,
            curProto:'jumin',
            reimburseNum:''
        }
    },
    watch: {
        
    },
    created() {
        //获取openid
        // var openid = base64.decode(utils.getQueryString('id')).slice(8)
        // http://szjb.nanjingdata.cn/index/Api/getUserInfo?id=openid

//         openid	微信openid
// sex	性别，0 未知，1 男，2 女
// nickname	微信用户昵称
// headimgurl	微信头像
// phone	手机号
// user_name	用户姓名
// id_number	用户身份证号
// is_certification	是否通过验证，1 是，0 否
// country	国家
// province	省
// city	市

    },
    mounted() {
        this.init()
    },
    methods: {
        init(){
            let _this = this
            // 获取banner
            this.getbanner(5,1).then((res)=>{
                if(res.data&&res.data.newsList&&res.data.newsList.length){
                    this.bannerData = res.data.newsList.slice(0.5)
                }
            })

            // var openid = base64.decode(_this.utils.getQueryString('id')).slice(8)
            var openid = 11111
            _this.getuserinfo(openid).then((res)=>{
                if(res&&res.data){
                    console.log('用户信息---->',res)
                    window.privateInfo = res
                    _this.getselfNum(res.data.openid).then((num)=>{
                        _this.reimburseNum = num
                    })
                }
                
            })

            this.getbanner('',0).then((res)=>{
                if(res.data&&res.data.newsList&&res.data.newsList.length){
                    this.newsData = res.data.newsList
                }
            })
        },
        getuserinfo(openid) {
            let _this = this
            var info = new Promise(function(resolve, reject) {
                _this.$axios.get(`${_this.hosts.szjbreal}/index/Api/getUserInfo`,{       
                    params:{
                        id:openid
                    }
                }).then(res => {
                    resolve(res)
                }).catch(e => {
                    console.log(e)
                    resolve({})
                })
            });
            return info;
        },
        getbanner(num,newsType){
            let _this = this
            var info = new Promise(function(resolve, reject) {
                _this.$axios.get(`${_this.hosts.szjb1}/medical/news/describeNewsList`,{       
                    params:{
                        newsNum:num,
                        newsType:newsType
                    }
                }).then(res => {
                    resolve(res)
                }).catch(e => {
                    console.log(e)
                    resolve([])
                })
            })
            return info;
        },
        // 获取我的报销数的方法
        getselfNum(id){
            let _this = this
            var info = new Promise(function(resolve, reject) {
                _this.$axios.get(`${_this.hosts.szjb1}medical/reimburse/getReimburseCount`,{       
                    params:{
                        wechatId:id
                    }
                }).then(res => {
                    resolve(res.data.reimburseNum)
                }).catch(e => {
                    console.log(e)
                    resolve('')
                })
            })
            return info;
        },
        gotobaoxiao(str){
            this.curProto = str
            if(str == 'jumin'){
                this.curBxTxt = '居民医保'
                this.getStaticInfo(3,0,'').then((res)=>{
                    this.mainXzTxt = res.dataList
                })
            }else if(str == 'zhigong'){
                this.curBxTxt = '职工医保'
                this.getStaticInfo(3,1,'').then((res)=>{
                    this.mainXzTxt = res.dataList
                })
            }else if(str == 'shengyu'){
                this.curBxTxt = '生育医保'
                this.getStaticInfo(3,2,'').then((res)=>{
                    this.mainXzTxt = res.dataList
                })
            }
            this.protopop = true
        },
        getStaticInfo(type,key,pkey){
            let _this = this
            // dataType   0: 医院 1: 街道 3: 报销须知 4: 缴费凭证
            // dataKey   0: 居民 1: 职工 2: 生育
            var info = new Promise(function(resolve, reject) {
                _this.$axios.get(`${_this.hosts.szjb1}/medical/data/getData`,{       
                    params:{
                        dataType:type,
                        dataKey:key,
                        parentKey:pkey
                    }
                }).then(res => {
                    resolve(res)
                }).catch(e => {
                    console.log(e)
                    resolve([])
                })
            })
            return info;
        },
        agree(){
            if(this.readalready){
                this.readalready = false
                this.$router.push({path:'/'+this.curProto})
            }   
        }
    }
};
</script>

<style lang="less">
.homepage{
    background:#FFF;
}
.bgcolor{
    width: 42rem;
    height: 42rem;
    border-radius: 42rem;
    background: #4873DD;
    position: absolute;
    top: -36rem;
    left: -13.5rem;
    z-index:0;
}
.baoxiao-list{
    height:4rem;
    width:14.04rem;
    margin:0.48rem auto 0;
    border-radius:0.24rem;
    background:#FFF;
    a{
        width:33%;
        padding-top:2.5rem;
        text-align:center;
        font-size:0.48rem;
    }
    .bx1{
        background:url(data:image/png;base64,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) no-repeat;
        background-size:1.08rem 0.96rem;
        background-position: 1.7rem 1.2rem;
    }
}
.bx-help{
    height:2.48rem;
    border-top:0.24rem solid #F2F2F2;
    border-bottom:0.24rem solid #F2F2F2;
    background:#FFF;
    overflow:hidden;
    a{
        float:left;
        display:block;
        width:50%;
        text-align: center;
        line-height:2rem;
        font-size:0.58rem;
        span{
            color:#4873DD;
        }
    }
    a:first-child{
        border-right:0.24rem solid #F2F2F2;
    }
}
.news-list{
    width:14.04rem;
    margin:0 auto;
    li{
        margin-bottom:0.36rem;
    }
    .title{
        position:relative;
        height:1.8rem;
        line-height:1.8rem;
        // padding-left:0.5rem;
        font-weight:700;
        font-size:0.6rem;
    }
    // .title:before{
    //     content: "";
    //     position: absolute;
    //     top: .6rem;
    //     left: 0;
    //     display: inline-block;
    //     width: .1rem;
    //     height:0.6rem;
    //     border-radius:0.1rem;
    //     // background:#4873DD;
    // }
    .tit{
        font-size:0.48rem;
    }
    img{
        width:3rem;
        height:2.5rem;
        margin-left:0.24rem;
        border-radius:0.24rem;
    }
    .time{
        font-size:0.4rem;
        color:#999;
    }
}
</style>
