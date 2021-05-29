<template>
    <div class="jumin">
        <div class="loagMask2" v-if="loading"><div class="mask-loading fixedLoading"></div></div>
        <div class="ifself" v-if="!selfshenb && !othershenb && detailId=='nothing'">
            <a href="javascript:;" @click="clickselfshenb()">本人申报</a>
            <a href="javascript:;" @click="othershenb=true">代他人申报</a>
        </div>
        <template v-if="selfshenb || othershenb || detailId != 'nothing'">
            <div class="toptitle">居民医保报销</div>
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

                <div class="question-bar" v-if="othershenb">
                    <div class="attr bottom-none"><em>*</em>报销人社保卡</div>
                    <div class="upfile">
                        <div class="operation-div" v-if="reimbursePeopleSocial && reimbursePeopleSocial.length">
                            <div class="img-wrap" v-for="(v,i) in reimbursePeopleSocial" :key="i">
                                <em class="close" @click="deletesth('reimbursePeopleSocial',i)"></em>
                                <img class="shoImg" :src="v | imageUrl">
                            </div>
                        </div>
                        <div class="file-wrap shebaoka" v-if="!reimbursePeopleSocial || !(reimbursePeopleSocial&&reimbursePeopleSocial.length)">
                            <input ref="uploadInput" type="file" class='upinp' name="file" value="" accept="image/gif,image/jpeg,image/jpg,image/png" @change="selectImg($event,'reimbursePeopleSocial')"/>
                        </div>
                        
                    </div>
                </div>

                <div class="question-bar" v-if="othershenb">
                    <div class="attr border-1px"><em>*</em>与报销人关系</div>
                    <div class="answer-list ipt"><input type="text" placeholder="请输入与报销人关系" maxlength="10" v-model="reimburseRelate" /></div>
                </div>

                <div class="question-bar">
                    <div class="attr"><em>*</em>所在街道</div>
                    <input type="hidden" name="su_idpersonStreet" id="suIdpersonStreet" v-model="personStreet" />
                    <div class="answer-list" id="showGeneralpersonStreet" @click="showModelOne('personStreet')">{{personStreet || '请输入所在街道'}}</div>
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
                    <div class="answer-list" id="showGeneralvisitHospitalName" @click="showModelOne('visitHospitalName')">{{visitHospitalName || '请输入就诊医院'}}</div>
                </div>

                <div :class="['next-step',btncurornot()]" @click="clicknextStep()">下一步</div>

            </template>
            <template v-if="curstep=='2'">
                <div class="question-bar" v-if="visitHospitalArea=='1' && !njnotInnj">
                    <div class="attr bottom-none"><em>*</em>上传缴费凭条</div>
                    <a href="javascript:;" class="desctip" @click="seeExample(paymentPicTest)">缴费凭条实例</a>
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
                </div>
                <template v-if="visitHospitalArea=='2' || njnotInnj">
                    <div class="question-bar">
                        <div class="attr border-1px"><em>*</em>就医类型</div>
                        <div class="answer-list ipt">
                            <div class="radio-btn" @click="visitType='1'"><em :class="['round',visitType=='1'?'cur':'']"></em>住院</div>
                            <div class="radio-btn" @click="visitType='2'"><em :class="['round',visitType=='2'?'cur':'']"></em>门诊</div>
                        </div>
                    </div>
                
                    <div class="question-bar">
                        <div class="attr bottom-none"><em>*</em>上传发票<span>（请确保上传的图像清晰）</span></div>
                        <a href="javascript:;" class="desctip" @click="seeExample(visitReceiptTest)">发票实例</a>
                        <div class="upfile">
                            <div class="operation-div">
                                <div class="img-wrap" v-for="(v,i) in visitReceipt" :key="i">
                                    <em class="close" @click="deletesth('visitReceipt',i)"></em>
                                    <img class="shoImg" :src="v | imageUrl">
                                </div>
                            </div>
                            <div class="file-wrap">
                                <input ref="uploadInput" type="file" multiple class='upinp' name="file" value="" accept="image/gif,image/jpeg,image/jpg,image/png" @change="selectImg($event,'visitReceipt')"/>
                            </div>
                        </div>
                    </div>
                    <template v-if="visitType=='1'">
                    <div class="question-bar">
                        <div class="attr bottom-none"><em>*</em>上传住院明细<span>（请确保上传的图像清晰）</span></div>
                        <a href="javascript:;" class="desctip" @click="seeExample(uploadPaymentDetailTest)">费用说明实例</a>
                        <div class="upfile">
                            <div class="operation-div">
                                <div class="img-wrap" v-for="(v,i) in uploadPaymentDetail" :key="i">
                                    <em class="close" @click="deletesth('uploadPaymentDetail',i)"></em>
                                    <img class="shoImg" :src="v | imageUrl">
                                </div>
                            </div>
                            <div class="file-wrap">
                                <input ref="uploadInput" type="file" multiple class='upinp' name="file" value="" accept="image/gif,image/jpeg,image/jpg,image/png" @change="selectImg($event,'uploadPaymentDetail')"/>
                            </div>
                            
                        </div>
                    </div>    

                    <div class="question-bar">
                        <div class="attr bottom-none"><em>*</em>上传出院小结<span>（请确保上传的图像清晰）</span></div>
                        <a href="javascript:;" class="desctip" @click="seeExample(visitEndRecordTest)">出院小结实例</a>
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
                        </div>
                    </div>
                    </template>
                </template>
                
                <div class="question-bar mb24">
                    <div class="attr bottom-none"><em>*</em>报销支付方式</div>
                    <div class="pay-method">
                        <div :class="['shebao method',reimbursePayType=='1'?'cur':'']" @click="clickshebao()">社保卡</div>
                        <div :class="['yinhang method',reimbursePayType=='2'?'cur':'']" @click="reimbursePayType='2'">银行卡</div>
                    </div>
                </div>
                <template v-if="reimbursePayType=='2'">
                    <div class="question-bar">
                        <div class="attr"><em>*</em>开户行地址</div>
                        <div class="answer-list" @click="showModelTwo">
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
            <div class="fixbanner-wrap" v-if="exampleList&&exampleList.length" @click="exampleList=[]"><div class="fixbanner"><banner :swipeData="exampleList" :swipeOpts="{name:'exampleList',auto:false}"></banner></div></div> 

        </template>
    </div>
</template> 

<script>
import hosts from "@/utils/hosts";
import {banner} from "@/components/components";
export default {
    name: "jumin",
    components: {
        banner
    },
    filters: {
       
    },
    data() {
      return {
            loading:false,
            curstep:'1',
            selfshenb:false,
            othershenb:false,
            reimbursePeople:'',
            reimbursePeopleSocial:'',
            reimburseRelate:'',
            personStreet:'',
            personStreetId:'',
            visitHospitalArea:'',   //1南京2异地
            visitHospitalName:'',
            paymentPic:'',
            visitType:'',  //1门诊2住院
            njnotInnj:false,
            visitReceipt:'',
            uploadPaymentDetail:'',
            visitEndRecord:'',
            reimbursePayType:'',   //1社保卡2银行卡
            bankCountry:'',
            bankCity:'',
            bankName:'',
            backNo:'',
            questionList:{
                personStreet:[
                    
                ],
                visitHospitalName:[
                    
                ]
            },
            popbox:false,
            exampleList:[],
            visitReceiptTest:['发票1.jpg','发票2.jpg','门诊发票.jpg','门诊发票2.jpg'],   //发票实例
            visitEndRecordTest:['出院小结.jpg'],   //出院小结
            uploadPaymentDetailTest:[],   //费用说明
            paymentPicTest:[],    //缴费凭证
            detailId: this.$route.params.id,
        }
    },
    created() {
        this.userInfo = JSON.parse(localStorage.getItem('privateInfo'))
    },
    mounted() {
        if(this.detailId != 'nothing'){
            this.getDetail().then((res)=>{
                let obj = res.data.medicalReimburse
                this.reimbursePeople = obj.reimbursePeople
                this.reimbursePeopleSocial = obj.reimbursePeopleSocial&&obj.reimbursePeopleSocial.split(',')
                this.reimburseRelate = obj.reimburseRelate
                this.othershenb = obj.reimburseRelate?true:false
                this.personStreet = obj.personStreet
                this.visitHospitalArea = +obj.visitHospitalArea+1
                this.visitType = +obj.visitType+1
                this.visitHospitalName = obj.visitHospitalName
                this.paymentPic = obj.paymentPic && obj.paymentPic.split(',')
                this.visitReceipt = obj.visitReceipt && obj.visitReceipt.split(',')
                this.uploadPaymentDetail = obj.uploadPaymentDetail&&obj.uploadPaymentDetail.split(',')
                this.visitEndRecord = obj.visitEndRecord&&obj.visitEndRecord.split(',')
                this.reimbursePayType = +obj.reimbursePayType+1
                this.bankCountry = obj.bankCountry
                this.bankCity = obj.bankCity
                this.bankName = obj.bankName
                this.backNo = obj.backNo
            })
        }
        this.getStreetList(1,0,'').then((res)=>{
            if(res&&res.length>0){
                res.forEach((v)=>{
                    v.id = v.medicalStaticDataId
                    v.value = v.dataValue
                })
                
                this.questionList.personStreet = res
            }
        })
    },
    beforeRouteLeave(to, from, next) {
        if(to.path.indexOf('bxsuccess') == -1){
            Wap.AlertBox({
                type: 'doubleBtn',
                title: "确认返回吗，你所填写的内容将丢失",
                alertType: "fixed",
                cancel: function () {
                },
                confirm: function () {
                    next(true);
                }
            })
        }else{
            next(true);
        }
    },
    methods: {
        //查看示例
        seeExample(arr){
            if(arr.length){
                let tem=[]
                arr.forEach((v)=>{
                    tem.push({
                        newsPic:'//jnhpublic.gzspiral.com/Lwt/' + v
                    })
                })
                this.exampleList = tem
                console.log(this.exampleList)
            }else{
                Wap.AlertBox({
                    type:"mini",
                    msg:"暂未维护，敬请期待~"
                })
            }
        },
        clickselfshenb(){
            this.selfshenb = true
            this.reimbursePeople = this.userInfo.user_name
        },
        clickshebao(){
            if(this.reimbursePayType != '1'){
                this.popbox = true
            }
        },
        deletesth(attr,i){
            this[attr].splice(i,1)
        },
        btncurornot(){
            let str = ''
            if(this.selfshenb || this.detailId != 'nothing'){
                if(this.reimbursePeople&&this.personStreet){
                    if(this.visitHospitalArea == '1'){
                        if(this.visitHospitalName){
                            str = 'cur'
                        }
                    }else if(this.visitHospitalArea == '2'){
                        str = 'cur'
                    }
                }
            }else if(this.othershenb || this.detailId != 'nothing'){
                if(this.reimbursePeople&&this.reimbursePeopleSocial&&this.reimburseRelate){
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
        btncurornot2(){
            let str = ''
            if(this.visitHospitalArea == '1'){
                if(this.paymentPic && this.paymentPic.length && this.reimbursePayType){
                    if(this.reimbursePayType == '1'){
                        str = 'cur'
                    }else{
                        if(this.bankCountry && this.bankCity && this.bankName && this.backNo){
                            str = 'cur'
                        }
                    }
                }
            }else if(this.visitHospitalArea == '2'){
                if(this.visitType && this.visitType == '2'){
                    if(this.visitReceipt && this.visitReceipt.length && this.uploadPaymentDetail && this.uploadPaymentDetail.length){
                        if(this.reimbursePayType == '1'){
                            str = 'cur'
                        }else{
                            if(this.bankCountry && this.bankCity && this.bankName && this.backNo){
                                str = 'cur'
                            }
                        }
                    }
                }else if(this.visitType && this.visitType == '1'){
                    if(this.visitReceipt && this.visitReceipt.length && this.uploadPaymentDetail && this.uploadPaymentDetail.length && this.visitEndRecord && this.visitEndRecord.length){
                        if(this.reimbursePayType == '1'){
                            str = 'cur'
                        }else{
                            if(this.bankCountry && this.bankCity && this.bankName && this.backNo){
                                str = 'cur'
                            }
                        }
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
                if(imgFile[key].size > 5 * 1024 * 1024){
                    Wap.AlertBox({
                        type:"mini",
                        msg:"单张图片大小应不超过5M，请重新选择上传"
                    })
                    e.target.value = ''   //有一张不满足条件，就全部清空
                    return false
                }
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
                }).catch((e)=>{
                    _this.loading = false
                    Wap.AlertBox({
                        type:"mini",
                        msg:"上传失败，稍后再试~"
                    })
                })
            }
        },
        getDetail(){
            let _this = this
            var info = new Promise(function(resolve, reject) {
                _this.$axios.get(`${_this.hosts.szjb1}/medical/reimburse/doGet`,{       
                    params:{
                        medicalReimburseId:_this.detailId
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
        getOrgList(){
            let _this = this
            var info = new Promise(function(resolve, reject) {
                _this.$axios.get(`${_this.hosts.szjb1}/medical/org/queryOrgList`,{       
                    params:{
                        loginAccount: 'admin',//this.user.loginAccount,
                        limit: 0,
                        offset: 100
                    }
                }).then(res => {
                    resolve(res&&res.data&&res.data.orgList)
                }).catch(e => {
                    console.log(e)
                    resolve([])
                })
            })
            return info;
        },
        showModelOne(i){
            let _this = this
            if(i == 'visitHospitalName'){
                _this.getOrgList().then((res)=>{
                    if(res&&res.length>0){
                        res.forEach((v)=>{
                            v.id = v.medicalOrganizationId
                            v.value = v.orgName
                        })
                        this.questionList.visitHospitalName = res.concat([{
                            id : 'other',
                            value : '其他医院'
                        }])
                        hook()
                    }
                })
            }else{
                hook()
            }
            function hook(){
                let showBankDom = document.querySelector('#showGeneral'+i);
                let bankIdDom = document.querySelector('#suId'+i);
                let bankId = showBankDom.dataset['id'];
                if(_this.questionList[i].length){
                    let bankSelect = new IosSelect(1, 
                        [_this.questionList[i]],
                        {
                            container: '.container'+i,
                            itemHeight: 35,
                            itemShowCount:5,
                            oneLevelId: bankId,
                            callback(selectOneObj) {
                                _this[i] = selectOneObj.value;
                                _this[i+'Id'] = selectOneObj.datakey;
                                bankIdDom.value = selectOneObj.id;
                               if(i == 'visitHospitalName'){
                                   if(selectOneObj.id == 'other'){
                                       _this.njnotInnj = true
                                   }else{
                                       _this.njnotInnj = false
                                   }
                               }
                            },
                            fallback(){
                                
                            }
                    });
                }
            }
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
                        _this.bankCountry = selectOneObj.value;
                        _this.bankCity = selectTwoObj.value;
                    }
            });
        },
        submit(){
            if(this.btncurornot2()){
            let _this = this
            _this.loading = true
            _this.$axios.post(`${_this.hosts.szjb1}/medical/reimburse/reimburseSubmit`,{       
                    wechatId:_this.userInfo.openid,
                    reimburseType:'1',
                    reimburseKind:(_this.selfshenb?'0':'1'),   
                    uploadPaymentDetail:_this.uploadPaymentDetail&&_this.uploadPaymentDetail.join(','),
                    reimbursePeopleSocial:(_this.selfshenb?'':_this.reimbursePeopleSocial&&_this.reimbursePeopleSocial.join(',')),
                    reimbursePeople:_this.reimbursePeople,
                    personStreet:_this.personStreet,
                    visitHospitalArea:_this.visitHospitalArea&&(_this.visitHospitalArea-1),
                    visitHospitalName:_this.visitHospitalName,
                    paymentPic:_this.paymentPic&&_this.paymentPic.join(','),
                    visitReceipt:_this.visitReceipt&&_this.visitReceipt.join(','),
                    visitEndRecord:_this.visitEndRecord&&_this.visitEndRecord.join(','),
                    visitType:_this.visitType&&(_this.visitType-1),
                    reimbursePayType:_this.reimbursePayType&&(_this.reimbursePayType-1),
                    bankCountry:_this.bankCountry,
                    bankCity:_this.bankCity,
                    bankName:_this.bankName,
                    backNo:_this.backNo,
                    medicalReimburseId:_this.detailId=='nothing'?'':_this.detailId
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
    }
};
</script>

<style lang="less">
    

</style>
