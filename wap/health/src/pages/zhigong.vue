<template>
    <div class="jumin">
        <div class="loagMask2" v-if="loading"><div class="mask-loading fixedLoading"></div></div>
        <div class="ifself" v-if="!selfshenb && !othershenb && detailId=='nothing'">
            <a href="javascript:;" @click="clickselfshenb()">本人申报</a>
            <a href="javascript:;" @click="othershenb=true">代他人申报</a>
        </div>
        <template v-if="selfshenb || othershenb || detailId != 'nothing'">
            <div class="toptitle">职工医保报销</div>
            <div class="step-list">
                <div class="step cur" @click="curstep='1'"><em>1</em>填写报销人信息</div><span></span>
                <div :class="['step',curstep=='2'?'cur':'']"><em>2</em>提交报销资料</div><span></span>
                <div class="step"><em>3</em>申报完成</div>
            </div>
            <div class="warm-tip">加<em>*</em>号为必填项，其他为选填项目</div>
            <template v-if="curstep == '1'">
                <div class="question-bar">
                    <div class="attr"><em>*</em>报销人</div>
                    <div class="answer-list ipt">
                        <input type="text" placeholder="请输入报销人姓名" maxlength="10" v-model="reimbursePeople" />
                    </div>
                </div>
                <div class="question-bar">
                    <div class="attr"><em>*</em>申请人联系方式</div>
                    <div class="answer-list ipt">
                        <input type="text" placeholder="请输入申请人联系方式" maxlength="11" v-model="primaryContactTelephone" />
                    </div>
                </div>
                <div class="question-bar">
                    <div class="attr"><em>*</em>报销人身份证号</div>
                    <div class="answer-list ipt">
                        <input type="text" placeholder="请输入报销人身份证号" v-model="reimburseCardNo" />
                    </div>
                </div>
                <div class="question-bar" v-if="selfshenb || detailId != 'nothing'&&reimbursePhone">
                    <div class="attr"><em>*</em>手机号</div>
                    <div class="answer-list ipt"><input type="tel" placeholder="请输入手机号" maxlength="11" v-model="reimbursePhone" /></div>
                </div>
                <div class="question-bar" v-if="othershenb || detailId != 'nothing'&&reimburseRelate">
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
                <template v-if="visitHospitalArea == '1'">
                    <template v-if="visitType=='1'">
                        <div class="question-bar">
                            <div class="attr bottom-none"><em>*</em>上传缴费凭条或者电子发票<span>（请确保上传的图像清晰）</span></div>
                            <a href="javascript:;" class="desctip" @click="seeExample(paymentPicTest)">缴费凭条实例</a>
                            <div class="upfile">
                                <div class="operation-div">
                                    <div class="img-wrap" v-for="(v,i) in paymentPic" :key="i">
                                        <em class="close" @click="deletesth('paymentPic',i)"></em>
                                        <img class="shoImg" :src="v | imageUrl">
                                    </div>
                                </div>
                                <div class="file-wrap">
                                    <input ref="uploadInput" type="file" multiple class='upinp' name="file" value="" accept="image/*" @change="selectImg($event,'paymentPic')"/>
                                  
                                </div>
                            </div>
                            
                            <div class="twotips" style="margin-top:0;">说明：如果凭条过长可分段拍摄，同一凭条切勿多次上传</div>
                        </div>
                        <div class="question-bar">
                            <div class="attr bottom-none">如门慢门特需上传病历<span>（请确保上传的图像清晰）</span></div>
                            <a href="javascript:;"  class="desctip" @click="seeExample(menMedicalRecordsTest)">病历实例</a>
                            <div class="upfile">
                                <div class="operation-div">
                                    <div class="img-wrap" v-for="(v,i) in menMedicalRecords" :key="i">
                                        <em class="close" @click="deletesth('menMedicalRecords',i)"></em>
                                        <img class="shoImg" :src="v | imageUrl">
                                    </div>
                                </div>
                                <div class="file-wrap">
                                    <input ref="uploadInput" type="file" multiple class='upinp' name="file" value="" accept="image/*" @change="selectImg($event,'menMedicalRecords')"/>
                                    
                                </div>
                            </div>
                            
                        </div>
                    </template>
                    <template v-if="visitType=='2'">
                        <div class="question-bar">
                            <div class="attr bottom-none"><em>*</em>上传缴费凭条或者电子发票<span>（请确保上传的图像清晰）</span></div>
                            <a href="javascript:;" class="desctip" @click="seeExample(paymentPicTest)">缴费凭条实例</a>
                            <div class="upfile">
                                <div class="operation-div">
                                    <div class="img-wrap" v-for="(v,i) in paymentPic" :key="i">
                                        <em class="close" @click="deletesth('paymentPic',i)"></em>
                                        <img class="shoImg" :src="v | imageUrl">
                                    </div>
                                </div>
                                <div class="file-wrap">
                                    <input ref="uploadInput" type="file" multiple class='upinp' name="file" value="" accept="image/*" @change="selectImg($event,'paymentPic')"/>
                                    
                                </div>
                            </div>
                            <div class="twotips" style="margin-top:0;">说明：如果凭条过长可分段拍摄，同一凭条切勿多次上传</div>
                        </div>

                        <div class="question-bar">
                            <div class="attr bottom-none"><em v-if="njnotInnj">*</em>上传出院记录<span>（请确保上传的图像清晰）</span></div>
                            <a href="javascript:;" class="desctip" @click="seeExample(visitEndRecordTest)">出院记录实例</a>
                            <div class="upfile">
                                <div class="operation-div">
                                    <div class="img-wrap" v-for="(v,i) in visitEndRecord" :key="i">
                                        <em class="close" @click="deletesth('visitEndRecord',i)"></em>
                                        <img class="shoImg" :src="v | imageUrl">
                                    </div>
                                </div>
                                <div class="file-wrap">
                                    <input ref="uploadInput" type="file" multiple class='upinp' name="file" value="" accept="image/*" @change="selectImg($event,'visitEndRecord')"/>
                                   
                                </div>
                                <div class="operation-div">
                                    <img class="shoImg" :src="imgDefault">
                                </div>
                            </div>
                        </div>    
                    </template>
                    <div class="question-bar" v-if="njnotInnj">
                        <div class="attr bottom-none">上传费用明细<span>（请确保上传的图像清晰）</span></div>
                        <a href="javascript:;" class="desctip" @click="seeExample(uploadPaymentDetailTest)">费用明细实例</a>
                        <div class="upfile">
                            <div class="operation-div">
                                <div class="img-wrap" v-for="(v,i) in uploadPaymentDetail" :key="i">
                                    <em class="close" @click="deletesth('uploadPaymentDetail',i)"></em>
                                    <img class="shoImg" :src="v | imageUrl">
                                </div>
                            </div>
                            <div class="file-wrap">
                                <input ref="uploadInput" type="file" multiple class='upinp' name="file" value="" accept="image/*" @change="selectImg($event,'uploadPaymentDetail')"/>
                                
                            </div>
                        </div>
                        <!-- <div class="twotips" style="margin-top:0;">说明：如果凭条过长可分段拍摄，同一凭条切勿多次上传</div> -->
                    </div>
                </template>
                <template v-if="visitHospitalArea == '2'">
                    <div class="question-bar">
                        <div class="attr bottom-none"><em>*</em>上传电子发票<span>（请确保上传的图像清晰）</span></div>
                        <a href="javascript:;" class="desctip" @click="seeExample(paymentPicTest)">缴费凭条实例</a>
                        <div class="upfile">
                            <div class="operation-div">
                                <div class="img-wrap" v-for="(v,i) in paymentPic" :key="i">
                                    <em class="close" @click="deletesth('paymentPic',i)"></em>
                                    <img class="shoImg" :src="v | imageUrl">
                                </div>
                            </div>
                            <div class="file-wrap">
                                <input ref="uploadInput" type="file" multiple class='upinp' name="file" value="" accept="image/*" @change="selectImg($event,'paymentPic')"/>
                               
                            </div>
                        </div>
                        <!-- <div class="twotips" style="margin-top:0;">说明：如果凭条过长可分段拍摄，同一凭条切勿多次上传</div> -->
                    </div>
                    <div class="question-bar">
                        <div class="attr bottom-none"><em v-if="visitType=='2'">*</em>上传费用明细<span>（请确保上传的图像清晰）</span></div>
                        <a href="javascript:;" class="desctip" @click="seeExample(uploadPaymentDetailTest)">费用明细实例</a>
                        <div class="upfile">
                            <div class="operation-div">
                                <div class="img-wrap" v-for="(v,i) in uploadPaymentDetail" :key="i">
                                    <em class="close" @click="deletesth('uploadPaymentDetail',i)"></em>
                                    <img class="shoImg" :src="v | imageUrl">
                                </div>
                            </div>
                            <div class="file-wrap">
                                <input ref="uploadInput" type="file" multiple class='upinp' name="file" value="" accept="image/*" @change="selectImg($event,'uploadPaymentDetail')"/>
                                
                            </div>
                        </div>
                        <!-- <div class="twotips" style="margin-top:0;">说明：如果凭条过长可分段拍摄，同一凭条切勿多次上传</div> -->
                    </div>
                    <div class="question-bar" v-if="visitType=='2'">
                        <div class="attr bottom-none"><em>*</em>上传出院记录<span>（请确保上传的图像清晰）</span></div>
                        <a href="javascript:;" class="desctip" @click="seeExample(visitEndRecordTest)">出院记录实例</a>
                        <div class="upfile">
                            <div class="operation-div">
                                <div class="img-wrap" v-for="(v,i) in visitEndRecord" :key="i">
                                    <em class="close" @click="deletesth('visitEndRecord',i)"></em>
                                    <img class="shoImg" :src="v | imageUrl">
                                </div>
                            </div>
                            <div class="file-wrap">
                                <input ref="uploadInput" type="file" multiple class='upinp' name="file" value="" accept="image/*" @change="selectImg($event,'visitEndRecord')"/>
                                
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
                        <div class="attr"><em>*</em>开户省市</div>
                  
                        <div class="answer-list " @click="showModelTwo">
                            <input type="hidden" name="contact_province_code" data-id="0001" id="contact_province_code" value="" data-province-name="">  
                            <input type="hidden" name="contact_city_code" id="contact_city_code" value="" data-city-name=""/>
                            <span data-city-code="" data-province-code="" data-district-code="" id="show_contact">{{bankCountry+bankCity || "请选择开户省市"}}</span> 
                        </div>
                    </div>
                    <div class="question-bar">
                        <div class="attr"><em>*</em>开户行（XX银行XX支行）</div>
                        <div class="answer-list ipt"><input type="text" placeholder="请输入开户行" v-model="bankName" /></div>
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
                    <div class="alert-msg1">请确保报销人社保卡已开通银行卡功能，否则无法支付</div>
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
    name: "zhigong",
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
            reimbursePhone:'',
            reimburseCardNo:'',
            reimbursePeople:'',
            reimburseRelate:'',
            visitHospitalArea:'',   //1南京2异地
            visitHospitalName:'',
            menMedicalRecords:'',
            visitType:'',  //1门诊2住院
            paymentPic:'',
            uploadPaymentDetail:'',
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
            popbox:false,
            exampleList:[],
            visitEndRecordTest:['出院记录.jpg'],  //出院记录
            paymentPicTest:[],  //缴费实例
            menMedicalRecordsTest:['门诊病历.jpg'], //病历
            uploadPaymentDetailTest:['费用明细.jpg'],  //费用明细实例
            detailId: this.$route.params.id

        }
    },
    watch: {
        
    },
    computed:{
        
    },
    created() {
        this.userInfo = JSON.parse(localStorage.getItem('privateInfo'))
        this.primaryContactTelephone = this.userInfo.user_phone
    },
    mounted() {
        if(this.detailId != 'nothing'){
            this.getDetail().then((res)=>{
                let obj = res.data.medicalReimburse
                this.reimbursePeople = obj.reimbursePeople
                this.primaryContactTelephone = obj.primaryContactTelephone
                this.reimburseCardNo = obj.reimburseCardNo
                this.reimbursePhone = obj.reimbursePhone
                this.reimburseRelate = obj.reimburseRelate
                this.visitHospitalArea = +obj.visitHospitalArea+1
                this.reimbursePayType = +obj.reimbursePayType+1
                this.visitHospitalName = obj.visitHospitalName
                this.visitType = +obj.visitType+1
                this.paymentPic = obj.paymentPic&&obj.paymentPic.split(',')
                this.menMedicalRecords = obj.menMedicalRecords&&obj.menMedicalRecords.split(',')
                this.visitEndRecord = obj.visitEndRecord&&obj.visitEndRecord.split(',')
                this.uploadPaymentDetail = obj.uploadPaymentDetail&&obj.uploadPaymentDetail.split(',')
                this.bankCountry = obj.bankCountry
                this.bankCity = obj.bankCity
                this.bankName = obj.bankName
                this.backNo = obj.backNo
            })
        }
        this.getOrgList().then((res)=>{
            if(res&&res.length>0){
                res.forEach((v)=>{
                    v.id = v.medicalOrganizationId
                    v.value = v.orgName
                })
                this.questionList.visitHospitalName = res.concat([{
                    id : 'other',
                    value : '其他医院'
                }])
            }
        })
    },
    beforeRouteLeave(to, from, next) {
        let _this = this
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
            }else{
                Wap.AlertBox({
                    type:"mini",
                    msg:"暂未维护，敬请期待~"
                })
            }
        },
        deletesth(attr,i){
            this[attr].splice(i,1)
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
        btncurornot2(){
            let str = ''
            if(this.visitType && this.visitType == '1'){   //门诊
                if(this.paymentPic && this.paymentPic.length){
                    if(this.reimbursePayType == '1'){
                        str =  'cur'
                    }else{
                        if(this.bankCountry && this.bankCity && this.bankName && this.backNo){
                            str =  'cur'
                        }
                    }
                }
            }else if(this.visitType && this.visitType == '2'){   //住院
                if(this.paymentPic && this.paymentPic.length && (this.visitEndRecord && this.visitEndRecord.length && this.visitHospitalName == '其他医院' || this.visitHospitalName&&this.visitHospitalName!='其他医院' || this.visitHospitalArea == '2' && this.visitEndRecord && this.visitEndRecord.length && this.uploadPaymentDetail && this.uploadPaymentDetail.length)){
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
            if(this.selfshenb || this.detailId != 'nothing'&&this.reimbursePhone){
                if(this.reimbursePeople&&this.reimburseCardNo&&this.reimbursePhone){
                    if(this.visitHospitalArea == '1'){
                        if(this.visitHospitalName){
                            str = 'cur'
                        }
                    }else if(this.visitHospitalArea == '2'){
                        str = 'cur'
                    }
                }
            }else if(this.othershenb || this.detailId != 'nothing'&&this.reimburseRelate){
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
            for(var i=0;i<imgFile.length;i++){
                if(imgFile[i].size > 15 * 1024 * 1024){
                    Wap.AlertBox({
                        type:"mini",
                        msg:"单张图片大小应不超过15M，请重新选择上传"
                    })
                    e.target.value = ''   //有一张不满足条件，就全部清空
                    return false
                }else{   // if(imgFile[i].size >= 1024 * 1024 && imgFile[i].size <= 15 * 1024 * 1024)
                    _this.loading = true
                    let formData = new FormData()
                    let ready = new FileReader()
                    var file = imgFile[i]
                    ready.readAsDataURL(file)
                    ready.onload = function(res){
                        var img = new Image();
                        img.src = this.result;
                        img.onload = function () {
                            var w;
                            var h;
                            if (this.width > this.height) {
                                w = 1000;
                                h = 1000 / (this.width / this.height);
                            } else {
                                w = 1000 * (this.width / this.height);
                                h = 1000;
                            }
                            var canvas = document.createElement('canvas');
                            var ctx = canvas.getContext('2d');
                            var anw = document.createAttribute("width");
                            anw.nodeValue = w;
                            var anh = document.createAttribute("height");
                            anh.nodeValue = h;
                            canvas.setAttributeNode(anw);
                            canvas.setAttributeNode(anh);
                            ctx.drawImage(this, 0, 0, w, h)
                            canvas.toBlob(function (blob) {
                                formData.append("files", blob, file.name);
                                
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
                            }, file.type);
                        }
                    }
                }
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
                        if(selectOneObj.id == 'other'){
                            _this.njnotInnj = true
                        }else{
                            _this.njnotInnj = false
                        }
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
                menMedicalRecords:_this.menMedicalRecords&&_this.menMedicalRecords.join(','),
                uploadPaymentDetail:_this.uploadPaymentDetail&&_this.uploadPaymentDetail.join(','),
                visitType:_this.visitType&&(_this.visitType-1),
                reimbursePayType:_this.reimbursePayType&&(_this.reimbursePayType-1),
                bankCountry:_this.bankCountry,
                bankCity:_this.bankCity,
                bankName:_this.bankName,
                backNo:_this.backNo,
                medicalReimburseId:_this.detailId=='nothing'?'':_this.detailId,
                primaryContactTelephone:_this.primaryContactTelephone
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
