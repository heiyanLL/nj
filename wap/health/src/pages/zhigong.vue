<template>
    <div class="jumin">
        <div class="loagMask2" v-if="loading"><div class="mask-loading fixedLoading"></div></div>
        <div class="ifself" v-if="!selfshenb && !othershenb">
            <a href="javascript:;" @click="clickselfshenb()">自己申报</a>
            <a href="javascript:;" @click="othershenb=true">帮别人申报</a>
        </div>
        <template v-if="selfshenb || othershenb">
            <div class="toptitle">职工医保报销</div>
            <div class="step-list">
                <div class="step cur" @click="curstep='1'"><em>1</em>填写报销人信息</div><span></span>
                <div :class="['step',curstep=='2'?'cur':'']"><em>2</em>提交报销资料</div><span></span>
                <div class="step"><em>3</em>申报完成</div>
            </div>
            <template v-if="curstep == '1'">
                <div class="question-bar">
                    <div class="attr"><em>*</em>报销人</div>
                    <div class="answer-list ipt">
                        <input type="text" placeholder="请输入报销人姓名" maxlength="10" v-model="reimbursePeople" />
                    </div>
                </div>

                <div class="question-bar">
                    <div class="attr"><em>*</em>报销人身份证号</div>
                    <div class="answer-list ipt">
                        <input type="text" placeholder="请输入报销人身份证号" v-model="reimburseCardNo" />
                    </div>
                </div>
                <div class="question-bar" v-if="selfshenb">
                    <div class="attr"><em>*</em>手机号</div>
                    <div class="answer-list ipt"><input type="tel" placeholder="请输入手机号" maxlength="11" v-model="reimbursePhone" /></div>
                </div>
                <div class="question-bar" v-if="othershenb">
                    <div class="attr"><em>*</em>与报销人关系</div>
                    <div class="answer-list ipt"><input type="text" placeholder="请输入与报销人关系" maxlength="10" v-model="reimburseRelate" /></div>
                </div>

                <div class="question-bar">
                    <div class="attr"><em>*</em>就诊地</div>
                    <div class="answer-list ipt">
                        <div class="radio-btn" @click="visitHospitalArea='2'"><em :class="['round',visitHospitalArea=='2'?'cur':'']"></em>异地</div>
                        <div class="radio-btn" @click="visitHospitalArea='1'"><em :class="['round',visitHospitalArea=='1'?'cur':'']"></em>南京</div>
                    </div>
                </div>

                <div class="question-bar" v-if="visitHospitalArea=='1'">
                    <div class="attr"><em>*</em>就诊医院</div>
                    <input type="hidden" name="su_idvisitHospitalName" id="suIdvisitHospitalName" v-model="visitHospitalName" />
                    <div class="answer-list" id="showGeneralvisitHospitalName" @click="showModelOne('visitHospitalName')">{{visitHospitalName || '请选择就诊医院'}}</div>
                </div>

                <div :class="['next-step',btncurornot()]" @click="clicknextStep()">下一步</div>

            </template>
            <template v-if="curstep=='2'">
                <div class="question-bar">
                    <div class="attr"><em>*</em>就医类型</div>
                    <div class="answer-list ipt">
                        <div class="radio-btn" @click="visitType='2'"><em :class="['round',visitType=='2'?'cur':'']"></em>住院</div>
                        <div class="radio-btn" @click="visitType='1'"><em :class="['round',visitType=='1'?'cur':'']"></em>门诊</div>
                    </div>
                </div>
                <template v-if="visitType=='1'">
                    <div class="question-bar">
                        <div class="attr bottom-none"><em>*</em>上传缴费凭条<span>（请确保上传的图像清晰）</span></div>
                        <a href="javascript:;" class="desctip">缴费凭条实例</a>
                        <div class="upfile">
                            <div class="operation-div">
                                <div class="img-wrap" v-for="(v,i) in paymentPic" :key="i">
                                    <em class="close" @click="deletesth('paymentPic',i)"></em>
                                    <img class="shoImg" :src="v | imageUrl">
                                </div>
                            </div>
                            <div class="file-wrap">
                                <input ref="uploadInput" type="file" multiple class='upinp' name="file" value="" accept="image/gif,image/jpeg,image/jpg,image/png" @change="selectImg($event,'paymentPic')"/>
                            </div>
                        </div>
                        
                        <div class="twotips" style="margin-top:0;">说明：如果凭条过长可分段拍摄，同一凭条切勿多次上传</div>
                    </div>
                    <div class="question-bar">
                        <div class="attr bottom-none">如门慢门特需上传病例<span>（请确保上传的图像清晰）</span></div>
                        <a href="javascript:;"  class="desctip">缴费凭条实例</a>
                        <div class="upfile">
                            <div class="operation-div">
                                <div class="img-wrap" v-for="(v,i) in menMedicalRecords" :key="i">
                                    <em class="close" @click="deletesth('menMedicalRecords',i)"></em>
                                    <img class="shoImg" :src="v | imageUrl">
                                </div>
                            </div>
                            <div class="file-wrap">
                                <input ref="uploadInput" type="file" multiple class='upinp' name="file" value="" accept="image/gif,image/jpeg,image/jpg,image/png" @change="selectImg($event,'menMedicalRecords')"/>
                            </div>
                        </div>
                        
                    </div>
                </template>
                <template v-if="visitType=='2'">
                    <div class="question-bar">
                        <div class="attr bottom-none"><em>*</em>上传缴费凭条<span>（请确保上传的图像清晰）</span></div>
                        <a href="javascript:;" class="desctip">缴费凭条实例</a>
                        <div class="upfile">
                            <div class="operation-div">
                                <div class="img-wrap" v-for="(v,i) in paymentPic" :key="i">
                                    <em class="close" @click="deletesth('paymentPic',i)"></em>
                                    <img class="shoImg" :src="v | imageUrl">
                                </div>
                            </div>
                            <div class="file-wrap">
                                <input ref="uploadInput" type="file" multiple class='upinp' name="file" value="" accept="image/gif,image/jpeg,image/jpg,image/png" @change="selectImg($event,'paymentPic')"/>
                            </div>
                        </div>
                        <div class="twotips" style="margin-top:0;">说明：如果凭条过长可分段拍摄，同一凭条切勿多次上传</div>
                    </div>

                    <div class="question-bar">
                        <div class="attr bottom-none"><em>*</em>上传出院记录<span>（请确保上传的图像清晰）</span></div>
                        <div class="upfile">
                            <div class="operation-div">
                                <div class="img-wrap" v-for="(v,i) in visitEndRecord" :key="i">
                                    <em class="close" @click="deletesth('visitEndRecord',i)"></em>
                                    <img class="shoImg" :src="v | imageUrl">
                                </div>
                            </div>
                            <div class="file-wrap">
                                <input ref="uploadInput" type="file" multiple class='upinp' name="file" value="" accept="image/gif,image/jpeg,image/jpg,image/png" @change="selectImg($event,'visitEndRecord')"/>
                            </div>
                            <div class="operation-div">
                                <img class="shoImg" :src="imgDefault">
                            </div>
                        </div>
                    </div>    
                </template>
                
                <div class="question-bar">
                    <div class="attr"><em>*</em>报销支付方式</div>
                    <div class="pay-method">
                        
                        <div :class="['shebao method',reimbursePayType=='1'?'cur':'']" @click="clickshebao()">社保卡</div>
                        <div :class="['yinhang method',reimbursePayType=='2'?'cur':'']" @click="reimbursePayType='2'">银行卡</div>
                    </div>
                </div>
                <template v-if="reimbursePayType=='2'">
                    <div class="question-bar">
                        <div class="attr"><em>*</em>开户行</div>
                  
                        <div class="answer-list " @click="showModelTwo">
                            <input type="hidden" name="contact_province_code" data-id="0001" id="contact_province_code" value="" data-province-name="">  
                            <input type="hidden" name="contact_city_code" id="contact_city_code" value="" data-city-name=""/>
                            <span data-city-code="" data-province-code="" data-district-code="" id="show_contact">{{bankCountry+bankCity || "请选择开户行地址"}}</span> 
                        </div>
                    </div>
                    <div class="question-bar">
                        <div class="attr"><em>*</em>银行名称</div>
                        <div class="answer-list ipt"><input type="text" placeholder="请输入银行名称" v-model="bankName" /></div>
                    </div>
                    <div class="question-bar">
                        <div class="attr"><em>*</em>卡号</div>
                        <div class="answer-list ipt"><input type="text" placeholder="请输入卡号" v-model="backNo" /></div>
                    </div>
                </template>

                <div :class="['next-step',btncurornot2()]" @click="submit()">提交</div>
            </template>
            <div class="play-info pophvm" v-if="popbox">
                <div class="content2">
                    <div class="alert-msg1">社保卡是否开通了银行卡功能，否则无法支付</div>
                    <div class="btn-wrap">
                        <div class="btn alert-btn1" @click="reimbursePayType='1';popbox=false">已开通</div>
                        <div class="btn alert-btn2" @click="reimbursePayType='2';popbox=false">支付到银行卡</div>
                    </div>
                    
                </div>
            </div>

        </template>
    </div>
</template> 

<script>
import hosts from "@/utils/hosts";
export default {
    name: "jumin",
    components: {
    },
    filters: {
       
    },
    data() {
      return {
            loading:false,
            curstep:'1',
            selfshenb:false,
            othershenb:false,
            reimbursePhone:'',
            reimburseCardNo:'',
            reimbursePeople:'',
            reimburseRelate:'',
            visitHospitalArea:'',   //1南京2异地
            visitHospitalName:'',
            menMedicalRecords:'',
            visitType:'',  //1门诊2住院
            paymentPic:'',
            visitEndRecord:'',
            reimbursePayType:'',   //1社保卡2银行卡
            bankCountry:'',
            bankCity:'',
            bankName:'',
            backNo:'',    //银行卡号
            questionList:{
                visitHospitalName:[
                    {'id': '104000000020', 'value': '医院1'},
                    {'id': '104000000010', 'value': '医院2'}
                ]
            },
            popbox:false
        }
    },
    watch: {
        
    },
    computed:{
        
    },
    created() {
        
    },
    mounted() {
        this.getStreetList('0','0','').then((res)=>{
            if(res&&res.length>0){
                res.forEach((v)=>{
                    v.id = v.medicalStaticDataId
                    v.value = v.dataValue
                })
                this.questionList.visitHospitalName = res
            }
        })
    },
    methods: {
        deletesth(attr,i){
            this[attr].splice(i,1)
        },
        clickselfshenb(){
            this.selfshenb = true
            this.reimbursePeople = window.privateInfo.user_name
        },
        clickshebao(){
            if(this.reimbursePayType != '1'){
                this.popbox = true
            }
        },
        getStreetList(type,key,pkey){
            let _this = this
            var info = new Promise(function(resolve, reject) {
                _this.$axios.get(`${_this.hosts.szjb1}/medical/data/getData`,{       
                    params:{
                        dataType:type,
                        dataKey:key,
                        parentKey:pkey
                    }
                }).then(res => {
                    resolve(res&&res.data&&res.data.dataList)
                }).catch(e => {
                    console.log(e)
                    resolve([])
                })
            })
            return info;
        },
        btncurornot2(){
            let str = ''
            if(this.visitType && this.visitType == '1'){
                if(this.paymentPic && this.paymentPic.length){
                    if(this.reimbursePayType == '1'){
                        str =  'cur'
                    }else{
                        if(this.bankCountry && this.bankCity && this.bankName && this.backNo){
                            str =  'cur'
                        }
                    }
                }
            }else if(this.visitType && this.visitType == '2'){
                if(this.paymentPic && this.paymentPic.length && this.visitEndRecord && this.visitEndRecord.length){
                    if(this.reimbursePayType == '1'){
                        str =  'cur'
                    }else if(this.reimbursePayType == '2'){
                        if(this.bankCountry && this.bankCity && this.bankName && this.backNo){
                            str =  'cur'
                        }
                    }
                }
            }
            return str
        },
        btncurornot(){
            let str = ''
            if(this.selfshenb){
                if(this.reimbursePeople&&this.reimburseCardNo&&this.reimbursePhone){
                    if(this.visitHospitalArea == '1'){
                        if(this.visitHospitalName){
                            str = 'cur'
                        }
                    }else if(this.visitHospitalArea == '2'){
                        str = 'cur'
                    }
                }
            }else if(this.othershenb){
                if(this.reimbursePeople&&this.reimburseCardNo&&this.reimburseRelate){
                    if(this.visitHospitalArea == '1'){
                        if(this.visitHospitalName){
                            str = 'cur'
                        }
                    }else if(this.visitHospitalArea == '2'){
                        str = 'cur'
                    }
                }
            }
            return str
        },
        clicknextStep(){
            if(this.btncurornot()){
                this.curstep = '2' 
            }
        },
        selectImg(e,attr){
            let _this = this
            let imgFile = e.target.files;
          
            let formData = new FormData();
            for(var key in imgFile){
                formData.append('files', imgFile[key]);
            }
            if (imgFile){ 
                _this.loading = true
                _this.$axios.post(`${_this.hosts.szjb1}/medical/help/uploadPictures`,formData).then(res => {
                    if(res&&res.data.picIds&&res.data.picIds.length){
                        _this.loading = false
                        if(_this[attr]){
                            _this[attr] = _this[attr].concat(res.data.picIds)
                        }else{
                            _this[attr] = res.data.picIds
                        }
                    }else{
                        _this.loading = false
                    }
                    
                   
                })
                
            }
        },
        showModelOne(i){
            let _this = this
                
            let showBankDom = document.querySelector('#showGeneral'+i);
            let bankIdDom = document.querySelector('#suId'+i);
            
            let bankId = showBankDom.dataset['id'];
            let bankName = showBankDom.dataset['value'];
            
            let bankSelect = new IosSelect(1, 
                [_this.questionList[i]],
                {
                    container: '.container'+i,
                    itemHeight: 35,
                    itemShowCount:5,
                    oneLevelId: bankId,
                    callback(selectOneObj) {
                        _this[i] = selectOneObj.value;
                        bankIdDom.value = selectOneObj.id;
                        showBankDom.innerText = selectOneObj.value;
                        // showBankDom.dataset['id'] = selectOneObj.id;
                        // showBankDom.dataset['value'] = selectOneObj.value;
                    },
                    fallback(){
                        
                    }
            });
        },
        showModelTwo(){
            let _this = this
            var showContactDom = document.querySelector('#show_contact');
            var contactProvinceCodeDom = document.querySelector('#contact_province_code');
            var contactCityCodeDom =  document.querySelector('#contact_city_code');
            var oneLevelId = showContactDom.dataset['province-code'];
            var twoLevelId = showContactDom.dataset['city-code'];
            var iosSelect = new IosSelect(2, 
                [_this.map.iosProvinces, _this.map.iosCitys],
                {
                    title: '',
                    itemHeight: 35,
                    relation: [1, 1],
                    oneLevelId: oneLevelId,
                    twoLevelId: twoLevelId,
                    callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
                        contactProvinceCodeDom.value = selectOneObj.id; 
                        contactCityCodeDom.value = selectTwoObj.id;
                        showContactDom.innerText = selectOneObj.value + ' ' + selectTwoObj.value;
                        _this.bankplace = selectOneObj.value + ' ' + selectTwoObj.value;
                    }
            });
        },
        submit(){
            let _this = this
            _this.loading = true
            _this.$axios.post(`${_this.hosts.szjb1}/medical/reimburse/reimburseSubmit`,{       
                wechatId:window.privateInfo.openid,
                reimburseCardNo:_this.reimburseCardNo,
                reimbursePhone:_this.reimbursePhone,
                reimburseRelate:_this.reimburseRelate,
                reimburseType:'0',
                reimburseKind:(_this.selfshenb?'0':'1'),   
                reimbursePeople:_this.reimbursePeople,
                visitHospitalArea:_this.visitHospitalArea&&(_this.visitHospitalArea-1),
                visitHospitalName:_this.visitHospitalName,
                paymentPic:_this.paymentPic&&_this.paymentPic.join(','),
                visitEndRecord:_this.visitEndRecord&&_this.visitEndRecord.join(','),
                visitType:_this.visitType&&(_this.visitType-1),
                reimbursePayType:_this.reimbursePayType&&(_this.reimbursePayType-1),
                bankCountry:_this.bankCountry,
                bankCity:_this.bankCity,
                bankName:_this.bankName,
                backNo:_this.backNo
            }).then(res => {
                _this.loading = false
                if(res&&res.data&&res.data.result&&res.data.result.code=='00' && res.data.medicalVerifyId){
                    _this.$router.push({path:'/bxsuccess/'+res.data.medicalVerifyId})
                }else{
                    Wap.AlertBox({
                        type:"mini",
                        msg:"网络异常，请稍后再试~"
                    })
                }
            }).catch(e => {
                _this.loading = false
                console.log(e)
                Wap.AlertBox({
                    type:"mini",
                    msg:"网络异常，请稍后再试~"
                })
            })
        }
    }
};
</script>

<style lang="less">
    

</style>
