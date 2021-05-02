<template>
    <div class="homepage">
        <div class="banner"><banner v-if="bannerData" :swipeData="bannerData" :swipeOpts="{name:'banner',auto:true}"></banner></div>
        <div class="baoxiao-list hor-view">
            <a href="javascript:;" class="bx1" @click.stop.prevent="gotobaoxiao('jumin')">bx1</a>
            <a href="javascript:;" class="bx2" @click.stop.prevent="gotobaoxiao('zhigong')">bx2</a>
            <a href="javascript:;" class="bx3" @click.stop.prevent="gotobaoxiao('shengyu')">bx3</a>
        </div> 
        <div class="bx-help">
            <a href="" @click.stop.prevent="$router.push({path:'/mybx'})">我的报销</a>
            <a href="" @click.stop.prevent="$router.push({path:'/helpcenter'})">帮助中心</a>
        </div>
        <div class="news-list">
            <div class="title">新闻资讯</div>
            <ul>
                <li>
                    <a href="javascript:;" class="hor-view" @click.stop.prevent="$router.push({path:'/jumin'})">
                        <div class="tit">
                            <div class="txt line-clamp-2">我是标题我是标题我是标题我是标题我是标题我是标题</div>
                            <div class="time">2021年10月2号</div>
                        </div>
                        <img src="//image.suning.com/uimg/cms/img/161900300620445011.png" alt="" />
                    </a>
                </li>
                <li>
                    <a href="javascript:;" class="hor-view" @click.stop.prevent="$router.push({path:'/jumin'})">
                        <div class="tit">
                            <div class="txt line-clamp-2">我是标题我是标题我是标题我是标题我是标题我是标题</div>
                            <div class="time">2021年10月2号</div>
                        </div>
                        <img src="//image.suning.com/uimg/cms/img/161900300620445011.png" alt="" />
                    </a>
                </li>
            </ul>
        </div>
        <div class="play-info" v-if="protopop">
            <div class="content">
                <div class="title">我是协议头部</div>
                <div class="main">内容</div>
                <div class="checkbox" @click="readalready=true"><em class="round"></em>您已同意</div>
                <div class="btn">
                    <a href="javascript:;" @click="readalready=false;protopop=false">取消</a>   
                    <a href="javascript:;" :class="[readalready?'cur':'']" @click="agree()">同意</a>   
                </div>
            </div>
        </div>
    </div>
</template> 

<script>
import hosts from "@/utils/hosts";
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
            bannerData:[
                {
					"linkUrl": "",
					"picUrl": "//image.suning.com/uimg/cms/img/161900300620445011.png",
				},
				{
					"linkUrl": "",
					"picUrl": "//image.suning.com/uimg/cms/img/161934237066204987.png",
				},
				{
					"linkUrl": "",
					"picUrl": "//image.suning.com/uimg/cms/img/161949532375471803.png",
					
                }
            ],
            protopop:false,
            readalready:false,
            curProto:'jumin'
        }
    },
    watch: {
        
    },
    created() {
        
    },
    mounted() {
        
    },
    methods: {
        getbanner(){
            
        },
        gotobaoxiao(str){
            this.curProto = str
            if(str == 'jumin'){

            }else if(str == 'zhigong'){

            }else if(str == 'shengyu'){

            }
            this.protopop = true
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
        font-size:0.58rem;
    }
}
.bx-help{
    height:2rem;
    width:14.04rem;
    margin:0.48rem auto 0;
    padding:0.5rem 0;
    border-radius:0.24rem;
    background:#FFF;
    overflow:hidden;
    a{
        float:left;
        display:block;
        width:50%;
        text-align: center;
        line-height:1rem;
        font-size:0.58rem;
    }
    a:first-child{
        border-right:1px solid #DDD;
    }
}
.news-list{
    width:14.04rem;
    margin:0.48rem auto 0;
    li{
        margin-bottom:0.36rem;
    }
    .title{
        position:relative;
        height:1.8rem;
        line-height:1.8rem;
        padding-left:0.5rem;
        font-weight:700;
        font-size:0.58rem;
    }
    .title:before{
        content: "";
        position: absolute;
        top: .4rem;
        left: 0;
        display: inline-block;
        width: .1rem;
        height:0.8rem;
        border-radius:0.1rem;
        background:red;
    }
    .tit{
        font-size:0.58rem;
    }
    img{
        width:3rem;
        height:2.5rem;
        margin-left:0.24rem;
        border-radius:0.24rem;
    }
    .time{
        font-size:0.48rem;
        color:#999;
    }
}
</style>
