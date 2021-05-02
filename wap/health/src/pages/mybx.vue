<template>
    <div class="mybx">
        <div class="placeholder">
            <div class="tab-list">
                <div class="item cur">全部</div>    
                <div class="item">审核中</div>    
                <div class="item">已审核</div>    
            </div>
        </div>
        
        <div class="bx-type">
            <input type="hidden" :name="'su_id'+'bxtype'" :id="'suId'+'bxtype'" v-model="street" />
            <div class="answer-list" :id="'showGeneral'+'bxtype'" @click="showModelOne('bxtype')">全部</div>
        </div>  
        <ul class="bx-list">
            <li @click="$router.push({path:'/bxdetail'})">
                <div class="type">居民医疗报销<span class="time">2021年1月1号</span></div>
                <div class="info">
                    <div class="ifself">报销人:本人</div>
                    <div class="paymethod">报销支付方式:银行卡</div>
                </div>
                <div class="state">审核中</div>
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
            bxtype:[
                {'id': '104000000020', 'value': '全部报销'},
                {'id': '104000000020', 'value': '居民'},
                {'id': '104000000020', 'value': '职工报销'},
                {'id': '104000000010', 'value': '生育报销'}
            ]
        }
    },
    created() {
       
    },
    mounted() {
       
    },
    methods: {
        showModelOne(i){
            let _this = this
                
            let showBankDom = document.querySelector('#showGeneral'+i);
            let bankIdDom = document.querySelector('#suId'+i);
            
            let bankId = showBankDom.dataset['id'];
            let bankName = showBankDom.dataset['value'];
            
            setTimeout(function(){
                let bankSelect = new IosSelect(1, 
                    [_this[i]],
                    {
                        container: '.container'+i,
                        itemHeight: 35,
                        itemShowCount:5,
                        oneLevelId: bankId,
                        callback(selectOneObj) {
                            _this[i] = selectOneObj.value;
                            bankIdDom.value = selectOneObj.id;
                            showBankDom.innerText = selectOneObj.value;
                            showBankDom.dataset['id'] = selectOneObj.id;
                            showBankDom.dataset['value'] = selectOneObj.value;
                        },
                        fallback(){
                            
                        }
                });
            },20)
        },
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
        width:33.3%;
        float:left;
        text-align:center;
        line-height:1.8rem;
        font-size:0.58rem;
    }
    .item.cur{
        color:red;
        font-weight:700;
    }
}
.bx-type{
    height:1.5rem;
    width:14.04rem;
    margin:0 auto;
    font-size:0.48rem;
    line-height:1.5rem;
    .answer-list{
        position:relative;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-right: 1.3rem;
        font-size:0.6rem;
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
    li{
        position:relative;
        width:14.04rem;
        padding:0.36rem 0.48rem;
        margin:0 auto 0.24rem;
        background:#FFF;
        border-radius:0.24rem;
        .state{
            position:absolute;
            top:0.36rem;
            right:0.48rem;
            width:2rem;
            text-align:right;
        }
        .info{
            margin-top:0.2rem;
        }
    }
}
</style>
