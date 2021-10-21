<template>
    <div class="homepage">
        <div class="bgcolor"></div> 
        <div class="banner"><banner v-if="bannerData" :swipeData="bannerData" :swipeOpts="{name:'banner',auto:true}"></banner></div>
        <div class="baoxiao-list hor-view">
            <a href="javascript:;" class="bx1" @click.stop.prevent="gotobaoxiao('jumin')">居民医保报销</a>
            <a href="javascript:;" class="bx2" @click.stop.prevent="gotobaoxiao('zhigong')">职工医保报销</a>
            <a href="javascript:;" class="bx3" @click.stop.prevent="gotobaoxiao('shengyu')">职工生育报销</a>
        </div> 
        <div class="bx-help">
            <a href="" @click.stop.prevent="$router.push({path:'/mybx'})">我的报销<span v-if="reimburseNum!=''">（{{reimburseNum}}）</span></a>
            <a href="" @click.stop.prevent="$router.push({path:'/helpcenter'})">帮助中心</a>
        </div>
        <div class="news-list">
            <div class="title">政策指南</div>
            <ul>
                <li v-for="(v,i) in newsData" :key="i">
                    <a href="javascript:;" class="hor-view" @click.stop.prevent="gotodetail(v)">
                        <div class="tit">
                            <div class="txt line-clamp-2">{{v.newsTitle}}</div>
                            <div class="time">{{v.updateTime | getTime}}</div>
                        </div>
                        <img :src="v.newsPic" alt="" />
                    </a>
                </li>
            </ul>
        </div>
        <div class="play-info" v-if="protopop">
            <div class="content-wrap">
            <div class="content">
                <div class="title" v-html="curBxTxt"></div>
                <div class="main" v-html="mainXzTxt"></div>
                <div class="checkbox" @click="readalready=!readalready"><em :class="['round',readalready?'cur':'']"></em>本人已阅读本须知内容，充分了解并清楚知晓相关要求。</div>
                <div class="btn">
                    <a href="javascript:;" @click="readalready=false;protopop=false">取消</a>   
                    <a href="javascript:;" :class="[readalready?'cur':'']" @click="agree()">同意</a>   
                </div>
            </div>
            </div>
        </div>
    </div>
</template> 

<script>
import CONST from "@/data/const";
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

// openid	微信openid
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
            if(localStorage.getItem('privateInfo')){
                let useInfo = JSON.parse(localStorage.getItem('privateInfo'))
                _this.getselfNum(useInfo.openid).then((num)=>{
                    _this.reimburseNum = num
                })
            }else{
                var openid = _this.utils.decode64(_this.utils.getQueryString('id')).slice(8)
                _this.getuserinfo(openid).then((res)=>{
                    if(res&&res.data){
                        console.log('用户信息---->',res)
                        window.privateInfo = res  
                        localStorage.setItem('privateInfo',JSON.stringify({
                            openid:res.data.openid,
                            user_name:res.data.user_name,
                            user_phone:res.data.phone
                        }))
                        _this.getselfNum(res.data.openid).then((num)=>{
                            _this.reimburseNum = num
                        })
                    }
                })
            }
            this.getbanner('',0).then((res)=>{
                if(res.data&&res.data.newsList&&res.data.newsList.length){
                    this.newsData = res.data.newsList
                }
            })
        },
        gotodetail(value){
            if(value.newsLink){
                window.location.href = value.newsLink
            }else{
                this.$router.push({path:'/everydetail/0_'+value.medicalNewsId})
            }
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
                this.curBxTxt = '居民医保零星报销<br/>申报须知'
                this.mainXzTxt = CONST.REMARK.JMBX
                // this.getStaticInfo(3,0,'').then((res)=>{
                //     this.mainXzTxt = res.data.dataList&&res.data.dataList.length&&res.data.dataList[0].dataValue
                // })
            }else if(str == 'zhigong'){
                this.curBxTxt = '职工医保电子票据零星报销<br/>申报须知'
                this.mainXzTxt = CONST.REMARK.ZGBX
                // this.getStaticInfo(3,1,'').then((res)=>{
                //     this.mainXzTxt = res.data.dataList&&res.data.dataList.length&&res.data.dataList[0].dataValue
                // })
            }else if(str == 'shengyu'){
                this.curBxTxt = '职工生育保险零星报销<br/>申报须知'
                this.mainXzTxt = CONST.REMARK.SYBX
                // this.getStaticInfo(3,2,'').then((res)=>{
                //     this.mainXzTxt = res.data.dataList&&res.data.dataList.length&&res.data.dataList[0].dataValue
                // })
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
                this.$router.push({path:'/'+this.curProto+'/nothing'})
            }   
        }
    }
};
</script>

<style lang="less">
.homepage{
    width: 100%;
    background: #FFF;
    overflow: hidden;
    position: relative;
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
    .bx2{
        background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAAA5pJREFUWAntmMtPU0EUh8+UUhVJ5FFFcdMYHzEQUTGYGOILKTHGRBP1X2CjGxeGEIsEA258rF25NZi4cAWiwRA1bhA0xqAJaCK+gFIRQZC2x99cWjJt72UKobdtwiS3d17nnG/OnJk7U0FpTu5W3hIMUa0Q5CWmfeM+KhdCsBWW06ohVfWee7x2cpiqw0x1BEjA7pG2OIK4qY0qUOy3sm8LcFELl5GD6jhM3olhOgy4dQaQiR9DTMdtBy69ye6/03SCASkAGSYqJfxYQUZa5puZapC5rdapeaEWlpuvvMu5g346JILkhdPkVO9HPC5LN4T+bCuhot56MWfGs+yQcLfxzhC8B895h37SMSjPX5jhhYyZyUidIAbcW4THEGrORntCNH/IT1Uov4jWqe+kgT13uOD3FNXIOIRSbzBIHlVRkvkx7AZdIO3MdVHn6BXxY2sbF0+F6Iw6I7Ahw8IUGIM0T+fbOefpRzoIRV54wQsjVcjnmPe2qBUUwgb1SgLmOKnjUgP1NgtEdVwquM590L03Wo1B9QR84ki0rL5jgDffYM9sEKsZHkRDDUA3qJ2TycPYFwnoIOpgJz0JNIgJnVxBC99Cn8tKv395JVT4rV5MK3VG1lnYyqcQhycl5Mwc7Yh2QDmphIHNYHn14N0B/3eON4r3SQkqnTDIbjhHBXbNjFA1ujxWuhlZgdEtzibode0uYxFQ1wAF4xUAVsonTHNCP11FYriFI7pjJPWLjokfXBAhKYXBxQgbhfnta2mxnajFrMZhuCKuBaGWXWkVONXzlXUe1i46bDl5G1vZ2NTnjKWXah8url8LjE1vN0D7FldjX2vWhYQWGCHxZr2T3PKxz4/WlpIJieDXRuGXKkw/HNa6U9KiBU6J1aUqlZ9/pocOB73MfGBBfkCeG2sSz+Q4tTG8VGesdH+cpy+O+eZhswH4c6BJ3FedoA0J7BJr5MFeCuG8bG/C0TbeoBYYH45ygH6KF7SjjEtBfrydjI5hnL4ry9rZpUJrgRES71yCtstHFbQlz1T8/QNdVW1pgRESsyM+MSgfVdCuPO5ejbhVXzvajSstkhbYLjBLO/Kux9Tc/5yGC1v4UeYDR0fCVIKYPp09wBHwrAPW7sPYJZzyfzU5wF+T0flJ31sLjF2iAqCB9CHGWs66kNAC4/M4gGk4IJ/YsaanpA8JoimcRXslXibcOLQeTo8fra2uAlv7ZmVaVj28Mn601vIfi6cLP96ZnUcAAAAASUVORK5CYII=) no-repeat;
        background-size:1.08rem 0.96rem;
        background-position: 1.7rem 1.2rem;
    }
    .bx3{
        background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAqCAYAAAD8pHgAAAAAAXNSR0IArs4c6QAABURJREFUaAXVWd9vVEUU/s69u0vLpjY0bEX60hatEWJaG8TWIAi0pOFBE6P1qb6ILyaiMdF/QF9MeNXEH4kSiEAIGpWopVgjjS2CmFSQ2Bgl0WCxGtCW3UK7u+M3d/euu9t7797dbr3tSWbnxzlz5nx3Zs7MmRUUkTqFPigMsLmL+TrmoSKRwqogTbm/ILhMxjBMHJadmCgU+v9qYg+lTiOGW3ifxvXYbRXmafY7jho8L9swWaGOirtZgLJgzhBMa8WaijuKNWsD0oPPi1lLWTcs5TdxqKpgtFKFtVyMJ9QQ3lCjaFhKEPm6hXumlwOfzG9cgvI16nwTBk4T6BXus7mKx0hjnpvjD2lH3EmH8Ase4CBPOTGXdZvge9p3EFG8Lg9i1rZVA5ogoDa7YQXml+lhH5VeXNC26z10xwoEkW9yCysjahh360YNyPuc0VLLnRTqkcRRpWDoJZfgkqtd7jb7sk/wZMZt+5JeEUL9y2e5CWb4yfSVaYppg5VU2duhI3hAwnNJ8Apd07uy6b/zSX2BJqTwMnnPckv4tbMx2D0kuES3tFt2EZQLqZN4hKCOElSNi0h+czzIPZRABH1eYLSlshsfE9AL+VZ7lYMDZGC/bMdvXsbleLvwDssXc3WPQnCATBzzsKuAJcLdZOCDgkaXSlCA4niY+6ccUjjrRzwYQAKTX10Hgv7JsG41JeWDAUSPVXaMpLC+JBoKBANIW3YD/X4MzMmk/ckHB0iwj7Pk6w7JQ3YLXfeOHDiPQnCAFO5hzPm2h20WS32NRvq44zxYcw86Xn00IF+CXkoWwdtacpYSuI/6G/2OoQEpv8JVkxP8zN27l9u8LT98ZijTz/SW+go6aLOIkeggCy387PuZJzKt7r8hmOvHELptHmaUqWYWaRWGmk9BMUxP3YwgNdWG5LQVDbqrKYszhDo8Ll2YXtBL0Exn/gyvqK/m83j9+Z31lxiVHuHyO8Ep0A+gjhRStRt35jh6rvQCtBZhPfg6Q2rW1Smk/vkFc5fWIRlv1q0VkeAjrMETspkvN06kso8dBs12IL7InucMPkDWGSbHpwNfToE4G5VZ34XV3U2Ido7BiOReWRzGdW7SD48h7HUFk+mV+bhp7HFWwm/di1+5XF904/sCZHdmzB5WRkM3ottmEY59a7f7zF+THQTlQvo9gEtpe5btCkjz+Rp7hNloVrYgKwuQ3ZMz1oDa9nbUtH5nt5XMTQx5ygyjg/w1WZke9QODCy8SfObErgiQVmTNVri1E6s2+JspHZl6UcoKwa9nRbQT8CaxQvUFMhUDymmKtHQgfPu5XN2tkPQO0ujJfqITupce6DmeOp354XixSjXO91JFb+hAkh7r0b5tUUQveB3xkQjSt6IlFH1C/kGEMcT99HcJ2QVs9SXu5PtbHxn7COiuBQJAvCqAtGJJTY8hcbbbYRCnphRnYpyMSRqm/yz708oNy2ncYLmBKcb2tZTRKcbUyrZW5l4UD4nInFLKewN6qbB5Zv0WmHUTSM34OYRNGtdpd2U5Q8URkt2eEyxZmKOrVFdLivkQUFAmVm3Ub2vBkWBSO4WRqllg1nF2DMdTvmpjeClSGDEQMt/zkimHxxVSh0jsfDl9qipr4IAh9w+e4j76tGqKQ02O/6xVTb+7omO8QYxlzqE6Y0AgP7rLlsExaxfvYMoYLis6jtV4WpctQLJp8Bpqot0E9WH5uop7RHyF1cW9Kq4LDhPMQ7LVumnQ0xeR+mbPZqjkY7zc0K0KzwDl96E8o0mlrmBmWEeZS0VJWn2VaZSx0yHeMAquXv8CTidRe3YiYW0AAAAASUVORK5CYII=) no-repeat;
        background-size:1.08rem 0.96rem;
        background-position: 1.7rem 1.2rem;
    }
}
.bx-help{
    height:3.28rem;
    border-top:0.24rem solid #F2F2F2;
    border-bottom:0.24rem solid #F2F2F2;
    background:#FFF;
    overflow:hidden;
    a{
        float:left;
        display:block;
        width:50%;
        text-align: left;
        text-indent: 3.3rem;
        line-height:2.8rem;
        font-size:0.48rem;
        span{
            color:#4873DD;
        }
    }
    a:first-child{
        background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA0CAYAAADfRPtlAAAAAXNSR0IArs4c6QAACGlJREFUaAXtWntsW1cZP9+1HT+ah53RsoIyCuvKRJkQpVKXREgrDAQbJG2qPBR1CCHWDRWFJg4bK6UrgyINkVTtxqPTyhCINjSQxJGgG6roytSwoa4FQWGw/UGWAm2y1W7TPOzY9+N3rneca8/3XqexR0A90s053+N85/zOOd93Hg4dHpl5iIR4kFl4xRJKRAJd4uNryvxb1q+nuWvtmluw2A1Dvms1UKp6QCfTp19Ozd6O/DmDuoY/mliC4Mw4iMlvphdaBsD/73Qd4P/6/F6fweszuMRH4PoSXeIT5Ng9t50GEf2VmB+x01msjIm2MvPdi7VjVd8WIE6DL7fVB/qsKheD3zcyXYNTWR6ANInj6CzAJxbTjj3AxVgutC5rUwDyaybxrIv4t27yj/pvEBN33ULxQk3Y6f3XAbbV+76HDsqvJMk2isI/ltQV6lpGgA6fmk5fTCxqk6BXLUQLZiNo9bbV+fZbVWzsvXQb6XQz5PBLrkHbcQzyeSFozOXVzw18MTRqVdeK7wjQquJC+ACWIBb3t9X7n8qtt3nflVo9lWoGvwmg3pUrz6KJzsBfB8rI9bP+rqpXsmQWROkBkhh3kWhqrQ2cMvdBzhYz9SBSf8zML6SMAUvhHvukFvDsHvxCxbhdnZICREemXUK7vaXO+yfVic8+xb7o69F9WHbbMGO2MUDVscrx1DIpiHZFwqEDVjqLasDKqOKj+/eZwTUfmFwOcL+B09+/WHCyDdipwD65v7Hn0hN7TnDeHcF2BjFCz7v8/gbV4UJzfSberGv62vbawHZVZ8v+y7fMJfWnsSTfo3jFzBGQjleuCG76yWdoymw3L2qTwnjLOpow0QUV+16YPe4u9z+plBsOccVcLDqMIS8JONkOVsSdVyaih1BsU+3KvCRLtG2D7+8ta2n+iBWN/Qg9uNXcsCxj1J/VNO3z8oMvPZ4rz6XxlLhL6pLQ7sXqupwrx0tca0NPtMvMLwlAcwPwDyxTbjLz5sv8QY+gwaGu4CFvTTAMxP+cl2WXELCei4Sr90pd0sQV+F9VtsYbFItHN30n9iElc1iiFDo6wv7lK6U/F5buWCXi6Iyhv+0gBy5OxnYb4SBPddnJBKcegOgr/S2UwOj3QrcnjyrWGj0i+TKYnHkx9s28OgaT3Uy8F8VPSNI2yBj6C/gjt4UbV/pu2PhumpXVMJIP6EJ/1NYEiWm35l090Lns383f5fLEbGwUkbE6qw6J54fD1bVv2NwGmwez5HkIInd9JFw5UtwlynxcgcPseXTiL+dpO5vFIpDSE1+VzP7tdBVr5U2+qGkuY/aae9nPQn8424AFxcmdUlJUgETaL1VzE1OxOmwJb1O0Q75t077oKqkTEK7H4IvTSh+r4vRQZ9UxSSf4cgeW9TuUzC7HGfbOe37My4oKUBPeDECd+ZN2HTDLsCQ9rIuvS96R7srXEF1luDcSAH1DFjAAQeg9mOYW8JfZe3UiutEWYDpY0N/gqnk/yGdUUwjhF1vqKBMFWZDh5ErumLPY2nhg8n1Sz+UVCDSUBNA/DIdDw5KXBschWS406eiDQxQVT7fX+++yMnhkZEb6xtcMOYsLWXrMq7NoB8I4uiWScra2yGsRImqfpolBWa1p39TKpB7vcDCRR8yrbWcQw+b0u1xGjjWfASiDAVpblqdFBxY3NfTG1kslEt6dAzuCBsCUHn8YwSfgUDmPmFbYA8xTxYqFk0UGYKostsJKL4tP9BpOMOvMn5s8xjKPhANjaRdBJHR7HjfroK2HsuxYEczLnZaoVVWDj4bSO7pB8VWlnEy6fEIkFWmdMyeHu6vPWiukJYNfqvizWaexJ7ZGICo5JawqnwNAuvnI72busDKk62KNkiGoVKiyV+eJuCJscgSm8k090T25KuCfGOwKnZR8RM97hC7kM0YmwV/fnyFsCrj9T9gChKG1MH7CxoZJxJWKONpZGcUoYwrz39GUHg7H5WjjTRu3JuSNXRgAWWc8DIuPqzoLyTHo40XzQazWzCgbvkN8cSGdKYUuZvCC7QwupFH443tPn2aP+o8I0CexSbc72JjFcozk6uC2cC7DY3ESOtEMLQssboLt2ixeHkL2oWgAsRGXvTI3dxvaOSPbgvFjBQCM4QqUdUHN7Weku/pbuTws/1YEGUeAuIEcKxpA2Qnm1N3IDIAej+eZ+FwSLoZHeZvUfJRdueKjzUJXW8QeZu1cvxyv+ZQ4H3U5XuBIvDTUGfpHEX0QHWBuUN3o76iYQPnnirbIb4y/Gk3mfpt7Y7uU/tne6LFcOXaInyq5VY5j3velrKgAsSTX972Q+IBqlDzuPWjIecNSFYqV42XgJk/woDRXVIDSICdTO2QuU6Sj4i84CvSlqbfuL0Dtfawj/etU0QHCW9r7Ts9mtowyX1kYDvSvtwoefPeEpyb0hGqv6ABlNOW43qsa6N9efkGQuxkNZw7mSmaVY6mvw23ic/JD+Z1Werl8DOT5Mo+7Fe878qBgpKK+ySijMneRa3NrnXdI8RDa72PWf6DoEuRTeNr4yFBX1e/Ntos+g8p4ilM/xDl2laIj4eBBTbjacSso5JiqqhWWy+dGog/ngpOVSwYQtkPYNn4ReYkzh/Ch7qojbs31UXRGbiFFSVj6Z73k24Cbf95bSSkBAp9YN/X67K+e+SMvU2gGOitPeUm7VdNo/0L8UtVXOepewnlpx9vLgxv6uwKZpxIlVznhP37xVDffASUoZo7OnPKyr6mpnsbNduUPMsmkvhMD0YgNpqD3Fuyro7jnHdY0/jZOKjGzvXxlgp/ciytRNw5Upf09nsUYGti6pd4/mtsR+YY6PnV5IyLwp/CtRjSsgQ4+w1/HsPWMoXwOt+vBoe7gi7n17ej/AEAjAKzgIYzeAAAAAElFTkSuQmCC) no-repeat;
        background-size:1.12rem 1.04rem;
        background-position:1.9rem 0.8rem;
        border-right:0.24rem solid #F2F2F2;
    }
    a:last-child{
        background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAAAXNSR0IArs4c6QAAA7BJREFUaAXtWt1LFFEUv2fG9sMPzBIKCyWkh+ilh2j9iogyJINU8qtvkHpJIon+gF4qiFzCoBcfomKDAhV6y4IglCRfoocgKowoSsh23W1dV/eezhSzOtOOzM3Z2Z1l5+Xu+bjnnN85986cubPA6BqawPXzibnLDKERGatUeJm7MAIAr8n/1e467zPROODxJJaH47FJhlglOjnd+pIEZ7pqvYMifqRIPHYtG8EoIJCzW8rqEQKEiIdFJtipiwzdcR5rEvEp0XoVyoCIcUt0EcpF7Egiyk7QzQPK9irlK5SvkM0ZyLklV2BzAlftruXGzHEGkltjiENU8vDxod6yT6YA0cM3jsieLjcCjB2gJ3lyPjAYpcZ2QdUBYPXUhZQu0TBGNkJJmuEO0q9QabMjMriJnK/T6/MYi7X4Q23JgPQKy2kKPHi0vrB5OS8wFp0hukzllcqeIwdrYFalA+PRCfq9S6WZLF846nNNqnRgbO4+dWvHVNqC0YMJfiXH9hBW5xYgWvemlhzplTwYjw5olgVCIS3FJCvEY9dJJ55kMFa1JCVuInGJ5NOqnPbTTvW3laMpQLS5veS0V+tYEy69UuFZrVxLkbxDx9GSFlG5teQoKXlAFq2MtJnJVyhtqbXIcL5CFiUybWbyFUpbag0MU0fx3kCUkp3VFaJXlK8bK9xC59vZDCjIgLXv3QKxlKUwYK7cywFwytJz6kETBvOtZwNGGH19cHPP7bY6SDazZh0ZAqIOe5GMnKJPGgGzxrJBLyUg5ZVbYlJnZ517JBuCFInhH0AEJgoStHbWuJ+IGMoWXR0gCDOZNXf5PC/0Abb3o3eehbbr+XbTiFwXszaCpJBOaWYA5aYun+uVVuUvtShHqtkCTylLpZ8p3h9ABOa7zOTGjnrXm0wFYpXfAjoX+CLJ0r4On/udVUYzaaeAbgK7ac9MZTIIK31L3bVec2C4jQ/XVSA03fpslos/UtcQXoUvW6aaBjRwHuYRpB66gURsiew/nVDSxa4Td7Eo/CO4laO5Q0ox6wbawDcwDnfo8G/FL+JKsoUBGbhMO7vVH96W4Auj1ChvMnKmADK95IyM2MUf7it5S3+VaaCm+cNKPh0DSAEx0lc25fKuaaBKGDYAjgKkgHp0rvhbkVfaQy9/LxVafzlmD+kDV25Os9PBEep09qsyR+0hNWh1vHcSflW61h6iTmdY5SmjYyukgmh/iHL8c3CQPtecdtRtWwWQaiQw0OoP+mnsSSV3LK+l/+fF3+l/BT3Fsij0AAAAAElFTkSuQmCC) no-repeat;
        background-size:1.04rem 1.04rem;
        background-position:2rem 0.8rem;
    }
}
.news-list{
    width:14.04rem;
    margin:0 auto;
    li{
        height:3.5rem;
        border-bottom:1px solid #F3F3F3;
        margin-bottom:0.48rem;
        a{
            height:3.5rem;
        }
    }
    li:last-child{
        border-bottom:none;
    }
    .title{
        position:relative;
        height:1.8rem;
        line-height:1.8rem;
        // padding-left:0.5rem;
        font-weight:700;
        font-size:0.6rem;
    }
    .tit{
        position: relative;
        font-size:0.48rem;
        width:11rem;
    }
    img{
        width:3.6rem;
        height:2.8rem;
        margin-left:0.24rem;
        border-radius:0.24rem;
    }
    .time{
        position:absolute;
        bottom:0.5rem;
        left:0;
        font-size:0.4rem;
        color:#999;
    }
}
</style>
