<template>
    <div class="mybx">
        <div class="placeholder">
            <div class="tab-list-wrap">
                <div class="tab-list">
                    <div :class="['item',i==curType?'cur':'']" v-for="(v,i) in typeList" :key="i" @click="diffType(i)"><span>{{v}}</span></div>        
                </div>
            </div>
        </div>
        <div class="bx-type">
            <input type="hidden" :name="'su_id'+'bxtype'" :id="'suId'+'bxtype'" />
            <div class="answer-list" :id="'showGeneral'+'bxtype'" @click="showModelOne('bxtype')">{{curbxTxt || '全部报销'}}</div>
        </div>  
        <ul class="bx-list">
            <li @click="$router.push({path:'/bxdetail/'+v.medicalReimburseId})" v-for="(v,i) in mybxList" :key="i">
                <div class="info">
                    <div class="ifself">报销人:{{v.reimburseKind=='0'?userInfo.user_name:v.reimbursePeople}}</div>
                    <div class="paymethod">报销支付方式:{{v.reimbursePayType=='0'?'社保卡':'银行卡'}}</div>
                </div>
                <div class="type">{{v.reimburseType=='1'?'居民医疗报销':(v.reimburseType=='0'?'职工医疗报销':'职工生育报销')}} - <span class="time">{{v.createTime | getTime}}</span></div>
                <div class="state s1" v-if="v.verifyStatus=='0'">未审核</div>
                <!-- <div class="state s1" v-if="v.verifyStatus=='1'">审核中</div> -->
                <div class="state s2" v-else>已审核</div>
                <!-- 未审核 0 初审成功 1 初审失败 2 复审成功 3 复审失败 4 -->
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
            typeList:['全部','未审核','已审核'],
            curType:0,
            bxtype:[
                {'id': '3', 'value': '全部报销'},
                {'id': '1', 'value': '居民医疗报销'},
                {'id': '0', 'value': '职工医疗报销'},
                {'id': '2', 'value': '职工生育报销'}
            ],
            curbx:'',
            curbxTxt:'',
            mybxList:[],
            mybxListTem:[],
            userInfo:{}
        }
    },
    created() {
        this.userInfo = JSON.parse(localStorage.getItem('privateInfo'))
    },
    mounted() {
       this.getList('').then((res)=>{
           this.mybxList = res
           this.mybxListTem = res
       })
    },
    methods: {
        getList(i){
            let _this = this
            // status  0 审核中 1 已审核
            var info = new Promise(function(resolve, reject) {
                _this.$axios.get(`${_this.hosts.szjb1}/medical/reimburse/getReimburseList`,{       
                    params:{
                        wechatId:_this.userInfo.openid,
                        status:i
                    }
                }).then(res => {
                    if(res&&res.data&&res.data.reimburseList){
                        resolve(res.data.reimburseList)
                    }else{
                        resolve([])
                    }
                }).catch(e => {
                    console.log(e)
                    resolve([])
                })
            })
            return info;
        },
        diffType(i){
            this.curType = i
            this.curbxTxt = ''
            let showBankDom = document.querySelector('#showGeneralbxtype');
            showBankDom.dataset['id'] = ''
            showBankDom.dataset['value'] = ''
            showBankDom.innerText='全部报销'
            if(i == '0'){
                this.getList('').then((res)=>{
                    this.mybxList = res
                })
            }else{
                this.getList(i-1).then((res)=>{
                    this.mybxList = res
                })
            }
            
        },
        showModelOne(i){
            let _this = this
            let showBankDom = document.querySelector('#showGeneral'+i);
            let bankIdDom = document.querySelector('#suId'+i);
            let bankId = showBankDom.dataset['id'];
            let bankName = showBankDom.dataset['value'];
            let temp = _this.mybxListTem
            let bankSelect = new IosSelect(1, 
                [_this[i]],
                {
                    container: '.container'+i,
                    itemHeight: 35,
                    itemShowCount:5,
                    oneLevelId: bankId,
                    callback(selectOneObj) {
                        _this.curbx = selectOneObj.id;
                        _this.curbxTxt = selectOneObj.value;
                        if(selectOneObj.id!=3){
                            _this.mybxList = temp.filter((k)=>k.reimburseType==selectOneObj.id)
                        }else{
                            _this.mybxList = _this.mybxListTem
                        }
                        bankIdDom.value = selectOneObj.id;
                        showBankDom.innerText = selectOneObj.value;
                        showBankDom.dataset['id'] = selectOneObj.id;
                        showBankDom.dataset['value'] = selectOneObj.value;
                    },
                    fallback(){
                        
                    }
            });
        },
    },
}
</script>
<style lang='less'>

.bx-type{
    height:1.6rem;
    width:14.04rem;
    margin:0 auto;
    font-size:0.48rem;
    line-height:1.6rem;
    .answer-list{
        position:relative;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-right: 1.3rem;
        font-size:0.48rem;
    }
    .answer-list:after{
        content: "";
        display: inline-block;
        margin-left:0.24rem;
        vertical-align:middle;
        margin-top: -0.28rem;
        width: .24rem;
        height: .24rem;
        border-style: solid;
        border-color: #666;
        border-width: .03rem 0 0 .03rem;
        transform: rotateZ(45deg);
        -webkit-transform: rotateZ(-135deg)
    }
}
.bx-list{
    background:#FFF;
    border-top:0.24rem solid #F3F3F3;
    li{
        position:relative;
        width:14.04rem;
        padding:0.36rem 0;
        margin:0 auto 0.24rem;
        border-bottom:1px solid #F3F3F3;
        .state{
            position:absolute;
            top:50%;
            right:0.64rem;
            width:2.24rem;
            height:0.76rem;
            border-radius:0.76rem;
            margin-top:-0.38rem;
            text-align:center;
            line-height:0.76rem;
            font-size:0.4rem;
        }
        .s1{
            background:rgba(238,132,53,0.2);
            color:rgb(238,132,53)
        }
        .s2{
            background:rgba(26,182,134, 0.2);
            color:rgb(26,182,134)
        }
        .info{
            font-size:0.56rem;
        }
        .type{
            margin-top:0.2rem;
            color:#969696;
            font-size:0.48rem;
        }
    }
    li:last-child{
        border-bottom:none;
    }
}
</style>
