<template>
    <div class="jumin">
        <div class="loagMask2" v-if="loading"><div class="mask-loading fixedLoading"></div></div>
        <div class="toptitle">生育医保报销</div>
        <div class="step-list">
            <div class="step cur" @click="curstep='1'"><em>1</em>填写报销人信息</div><span></span>   
            <div :class="['step',curstep=='2'?'cur':'']"><em>2</em>提交报销资料</div><span></span>
            <div class="step"><em>3</em>申报完成</div>
        </div>
        <div class="warm-tip">加<em>*</em>号为必填项，其他为选填项目</div>
        <template v-if="curstep == '1'">
            <div class="question-bar">
                <div class="attr"><em>*</em>申请人</div>
                <div class="answer-list ipt">
                    <input type="text" placeholder="请输入申请人姓名" maxlength="10" v-model="applyName" />
                </div>
            </div>
            <div class="question-bar">
                <div class="attr"><em>*</em>申请人联系方式</div>
                <div class="answer-list ipt">
                    <input type="text" placeholder="请输入申请人联系方式" maxlength="11" v-model="primaryContactTelephone" />
                </div>
            </div>
            <div class="question-bar">
                <div class="attr"><em>*</em>申请人身份证号</div>
                <div class="answer-list ipt">
                    <input type="text" placeholder="请输入报销人身份证号" v-model="applyCard" />
                </div>
            </div>
            <div class="question-bar">
                <div class="attr"><em>*</em>手机号码</div>
                <div class="answer-list ipt"><input type="tel" placeholder="请输入手机号" maxlength="11" v-model="applyPhone" /></div>
            </div>
            <div class="question-bar">
                <div class="attr"><em>*</em>参保单位</div>
                <div class="answer-list ipt"><input type="text" placeholder="生育或计生手术当月所在参保单位" v-model="reimburseUnit"/></div>
            </div>
            <div class="question-bar">
                <div class="attr">单位社保代码</div>
                <div class="answer-list ipt"><input type="text" placeholder="请输入单位社保代码" v-model="companySocialCode" /></div>
            </div>
            <div class="question-bar">
                <div class="attr"><em>*</em>报销人</div>
                <div class="answer-list ipt"><input type="text" placeholder="请输入报销人姓名" maxlength="10" v-model="reimbursePeople" /></div>
            </div>
            <div class="question-bar">
                <div class="attr"><em>*</em>报销人身份证号</div>
                <div class="answer-list ipt"><input type="text" placeholder="请输入报销人身份证号" v-model="reimburseCardNo" /></div>
            </div>
            <div class="question-bar">
                <div class="attr"><em>*</em>性别</div>
                <div class="answer-list ipt">
                    <div class="radio-btn" @click="reimbursePeopleSex='2'"><em :class="['round',reimbursePeopleSex=='2'?'cur':'']"></em>女</div>
                    <div class="radio-btn" @click="reimbursePeopleSex='1'"><em :class="['round',reimbursePeopleSex=='1'?'cur':'']"></em>男</div>
                </div>
            </div>
            <div class="question-bar">
                <div class="attr"><em>*</em>申报类别</div>
                <div class="answer-list ipt">
                    <div class="radio-btn" @click="declareType='2'"><em :class="['round',declareType=='2'?'cur':'']"></em>计生</div>
                    <div class="radio-btn" @click="declareType='1'"><em :class="['round',declareType=='1'?'cur':'']"></em>生育</div>
                </div>
            </div>
            <!-- 选生育时 -->
            <div class="question-bar" v-if="reimbursePeopleSex=='1'&&declareType=='1'">
                <div class="attr"><em>*</em>配偶是否无业无保险</div>
                <div class="answer-list ipt">
                    <div class="radio-btn" @click="declareTypeTwo='2'"><em :class="['round',declareTypeTwo=='2'?'cur':'']"></em>否</div>
                    <div class="radio-btn" @click="popbox2=true;"><em :class="['round',declareTypeTwo=='1'?'cur':'']"></em>是</div>
                </div>
            </div>

            <div :class="['next-step',btncurornot()]" @click="clicknextStep()">下一步</div>

        </template>
        <template v-if="curstep=='2'">
            <!-- 生育相关 -->
            <template v-if="declareType=='1'">
                <div class="question-bar">
                    <div class="attr"><em>*</em>生育医院名称</div>
                    <div class="answer-list ipt"><input type="text" placeholder="请输入生育医院名称" v-model="birthHospitalName" /></div>
                </div>
                <div class="question-bar">
                    <div class="attr"><em>*</em>生育胎儿数</div>
                    <div class="answer-list ipt three">
                        <div class="radio-btn" @click="birthBabyNo='3'"><em :class="['round',birthBabyNo=='3'?'cur':'']"></em>二胎以上</div>
                        <div class="radio-btn" @click="birthBabyNo='2'"><em :class="['round',birthBabyNo=='2'?'cur':'']"></em>二胎</div>
                        <div class="radio-btn" @click="birthBabyNo='1'"><em :class="['round',birthBabyNo=='1'?'cur':'']"></em>一胎</div>
                    </div>
                </div>
                <!-- 男，生育 -->
                <!-- 配偶无保险 -->
                <div class="midtitle" v-if="reimbursePeopleSex=='1'&&declareTypeTwo=='1'">友情提醒：您可以报销护理假津贴及配偶产检、分娩费用</div>   
                <div class="midtitle" v-if="reimbursePeopleSex=='1'&&declareTypeTwo=='2'">友情提醒：您可以报销护理假津贴</div>
                <div class="midtitle" v-if="reimbursePeopleSex=='2'">津贴及营养费、分娩费用报销</div>
            
                <div class="question-bar">
                    <div class="attr bottom-none"><em>*</em>上传结婚证或离婚证<span class="a1">（请确保上传的图像清晰）</span></div>
                    <div class="upfile">
                        <div class="operation-div">
                            <div class="img-wrap" v-for="(v,i) in marriageCertificate" :key="i">
                                <em class="close" @click="deletesth('marriageCertificate',i)"></em>
                                <img class="shoImg" :src="v | imageUrl">
                            </div>
                        </div>
                        <div class="file-wrap">
                            <input ref="uploadInput" type="file" multiple class='upinp' name="file" value="" accept="image/*" @change="selectImg($event,'marriageCertificate')"/>
                           
                        </div>
                    </div>
                </div>
                <div class="question-bar">
                    <div class="attr bottom-none"><em>*</em>上传出院小结</div>
                    <div class="upfile">
                        <div class="operation-div">
                            <div class="img-wrap" v-for="(v,i) in medicalRecord" :key="i">
                                <em class="close" @click="deletesth('medicalRecord',i)"></em>
                                <img class="shoImg" :src="v | imageUrl">
                            </div>
                        </div>
                        <div class="file-wrap">
                            <input ref="uploadInput" type="file" multiple class='upinp' name="file" value="" accept="image/*" @change="selectImg($event,'medicalRecord')"/>
                            
                        </div>
                    </div>
                </div>
                <div class="question-bar" v-if="reimbursePeopleSex=='1'&&declareTypeTwo=='1' || reimbursePeopleSex=='2'">
                    <div class="attr bottom-none">上传产检及分娩发票</div>
                    <div class="twotips">
                        如果需要报销产检和分娩费用，此项必填<br/>
                        如在江北新区17家医疗机构就诊，可上传缴费凭条；
                        <!-- 2、查看<a href="" class="desctip">17家医疗机构</a>和<a href="" class="desctip">缴费凭证示例</a> -->
                        <!-- 2、查看<a href="" class="desctip" @click="seeExample(childbirthReceiptTest)">缴费凭证示例</a> -->
                    </div>
                    <div class="upfile">
                        <div class="operation-div">
                            <div class="img-wrap" v-for="(v,i) in childbirthReceipt" :key="i">
                                <em class="close" @click="deletesth('childbirthReceipt',i)"></em>
                                <img class="shoImg" :src="v | imageUrl">
                            </div>
                        </div>
                        <div class="file-wrap">
                            <input ref="uploadInput" type="file" multiple class='upinp' name="file" value="" accept="image/*" @change="selectImg($event,'childbirthReceipt')"/>
                           
                        </div>
                    </div>
                </div>
                    
                <div class="question-bar" v-if="reimbursePeopleSex=='1'&&declareTypeTwo=='1'">
                    <div class="attr bottom-none"><em>*</em>上传女方无业证明或者创业就业登记证</div>
                    <div class="upfile">
                        <div class="operation-div">
                            <div class="img-wrap" v-for="(v,i) in womanCertificate" :key="i">
                                <em class="close" @click="deletesth('womanCertificate',i)"></em>
                                <img class="shoImg" :src="v | imageUrl">
                            </div>
                        </div>
                        <div class="file-wrap">
                            <input ref="uploadInput" type="file" multiple class='upinp' name="file" value="" accept="image/*" @change="selectImg($event,'womanCertificate')"/>
                            
                        </div>
                    </div>
                </div>
                <div class="question-bar">
                    <div class="attr bottom-none"><em v-if="birthBabyNo == '3'">*</em>上传准生证（三胎及以上必须提供）</div>
                    <div class="upfile">
                        <div class="operation-div">
                            <div class="img-wrap" v-for="(v,i) in pregnancyPermit" :key="i">
                                <em class="close" @click="deletesth('pregnancyPermit',i)"></em>
                                <img class="shoImg" :src="v | imageUrl">
                            </div>
                        </div>
                        <div class="file-wrap">
                            <input ref="uploadInput" type="file" multiple class='upinp' name="file" value="" accept="image/*" @change="selectImg($event,'pregnancyPermit')"/>
                            
                        </div>
                    </div>
                </div>
                <div class="question-bar" v-if="!(reimbursePeopleSex=='1'&&declareTypeTwo=='2')">
                    <div class="attr bottom-none">其他上传</div>
                    <div class="twotips">异地生育可上传《异地生育申报表》</div>
                    <div class="upfile">
                        <div class="operation-div">
                            <div class="img-wrap" v-for="(v,i) in allopatricBirth" :key="i">
                                <em class="close" @click="deletesth('allopatricBirth',i)"></em>
                                <img class="shoImg" :src="v | imageUrl">
                            </div>
                        </div>
                        <div class="file-wrap">
                            <input ref="uploadInput" type="file" multiple class='upinp' name="file" value="" accept="image/*" @change="selectImg($event,'allopatricBirth')"/>
                           
                        </div>
                    </div>
                </div>
            </template>
            <!-- 计生相关 -->
            <template v-if="declareType=='2'">
                <div class="midtitle">友情提醒：您可以报销津贴及计生手术费用</div>
                <div class="question-bar">
                    <div class="attr bottom-none"><em>*</em>上传结婚证或离婚证</div>
                    <div class="upfile">
                        <div class="operation-div">
                            <div class="img-wrap" v-for="(v,i) in marriageCertificate" :key="i">
                                <em class="close" @click="deletesth('marriageCertificate',i)"></em>
                                <img class="shoImg" :src="v | imageUrl">
                            </div>
                        </div>
                        <div class="file-wrap">
                            <input ref="uploadInput" type="file" multiple class='upinp' name="file" value="" accept="image/*" @change="selectImg($event,'marriageCertificate')"/>
                            
                        </div>
                    </div>
                </div>
                <div class="question-bar">
                    <div class="attr bottom-none"><em>*</em>上传出院小结或者门诊病历</div>
                    <div class="upfile">
                        <div class="operation-div">
                            <div class="img-wrap" v-for="(v,i) in medicalRecord" :key="i">
                                <em class="close" @click="deletesth('medicalRecord',i)"></em>
                                <img class="shoImg" :src="v | imageUrl">
                            </div>
                        </div>
                        <div class="file-wrap">
                            <input ref="uploadInput" type="file" multiple class='upinp' name="file" value="" accept="image/*" @change="selectImg($event,'medicalRecord')"/>
                            
                        </div>
                    </div>
                </div>
                <div class="question-bar">
                    <div class="attr bottom-none">计生费用发票</div>
                    <div class="twotips">
                        1、需要报销计生手术费用，此项必填<br/>
                        2、如在江北新区17家医疗机构就诊，可上传缴费凭条
                        <!-- 2、查看<a href="" class="desctip">17家医疗机构</a>和<a href="" class="desctip">缴费凭证示例</a> -->
                        <!-- 2、查看<a href="" class="desctip" @click="seeExample(birthPaymenReceiptTest)">缴费凭证示例</a> -->
                    </div>
                    <div class="upfile">
                        <div class="operation-div">
                            <div class="img-wrap" v-for="(v,i) in birthPaymenReceipt" :key="i">
                                <em class="close" @click="deletesth('birthPaymenReceipt',i)"></em>
                                <img class="shoImg" :src="v | imageUrl">
                            </div>
                        </div>
                        <div class="file-wrap">
                            <input ref="uploadInput" type="file" multiple class='upinp' name="file" value="" accept="image/*" @change="selectImg($event,'birthPaymenReceipt')"/>
                           
                        </div>
                    </div>
                </div>
                <div class="question-bar">
                    <div class="attr bottom-none">上传费用明细<span></span></div>
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
            
            <div :class="['next-step',btncurornot2()]" @click="submit()">提交</div>
        </template>
        <div class="play-info pophvm" v-if="popbox2">
            <div class="content2">
                <div class="alert-msg1">请确认配偶是否无业无保险</div>
                <div class="btn-wrap">
                    <div class="btn alert-btn1" @click="declareTypeTwo='2';popbox2=false">取消</div>
                    <div class="btn alert-btn2" @click="declareTypeTwo='1';popbox2=false">确认</div>
                </div>
            </div>
        </div>
    </div>
</template> 

<script>
import hosts from "@/utils/hosts";
import {banner} from "@/components/components";
export default {
    name: "shengyu",
    components: {
        banner
    },
    filters: {
       
    },
    data() {
      return {
            loading:false,
            curstep:'1',
            applyName:'',
            applyCard:'',
            applyPhone:'',
            reimburseUnit:'',
            companySocialCode:'',
            reimbursePeople:'',
            reimburseCardNo:'',
            reimbursePeopleSex:'',
            declareType:'',
            declareTypeTwo:'',
            birthBabyNo:'',
            marriageCertificate:'',
            medicalRecord:'',
            childbirthReceipt:'',
            womanCertificate:'',
            pregnancyPermit:'',
            birthPaymenReceipt:'',
            allopatricBirth:'',
            birthHospitalName:'',
            popbox2:false,
            exampleList:[],
            detailId: this.$route.params.id,
            uploadPaymentDetailTest:['费用明细.jpg']

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
                this.applyName = obj.applyName
                this.applyPhone = obj.applyPhone
                this.applyCard = obj.applyCard
                this.reimburseUnit = obj.reimburseUnit
                this.companySocialCode = obj.companySocialCode
                this.primaryContactTelephone = obj.primaryContactTelephone
                this.reimbursePeople = obj.reimbursePeople
                this.reimburseCardNo = obj.reimburseCardNo
                this.reimbursePeopleSex = +obj.reimbursePeopleSex+1
                this.declareType = +obj.declareType+1
                this.declareTypeTwo = +obj.declareTypeTwo+1
                this.birthHospitalName = obj.birthHospitalName
                this.birthBabyNo = +obj.birthBabyNo+1
                this.allopatricBirth = obj.allopatricBirth&&obj.allopatricBirth.split(',')
                this.marriageCertificate = obj.marriageCertificate&&obj.marriageCertificate.split(',')
                this.medicalRecord = obj.medicalRecord&&obj.medicalRecord.split(',')
                this.childbirthReceipt = obj.childbirthReceipt&&obj.childbirthReceipt.split(',')
                this.womanCertificate = obj.womanCertificate&&obj.womanCertificate.split(',')
                this.pregnancyPermit = obj.pregnancyPermit&&obj.pregnancyPermit.split(',')
                this.birthPaymenReceipt = obj.birthPaymenReceipt&&obj.birthPaymenReceipt.split(',')
                this.uploadPaymentDetail = obj.uploadPaymentDetail&&obj.uploadPaymentDetail.split(',')
            })
        }
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
            }else{
                Wap.AlertBox({
                    type:"mini",
                    msg:"暂未维护，敬请期待~"
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
        submit(){
            if(this.btncurornot2()){
                let _this = this
                _this.loading = true
                _this.$axios.post(`${_this.hosts.szjb1}/medical/reimburse/reimburseSubmit`,{ 
                    reimburseType:'2',      
                    wechatId:_this.userInfo.openid,
                    applyName:_this.applyName,
                    applyCard:_this.applyCard,
                    applyPhone:_this.applyPhone,
                    reimburseUnit:_this.reimburseUnit,
                    companySocialCode:_this.companySocialCode,
                    reimbursePeople:_this.reimbursePeople,
                    reimburseCardNo:_this.reimburseCardNo,
                    reimbursePeopleSex:_this.reimbursePeopleSex&&(_this.reimbursePeopleSex-1),
                    declareType:_this.declareType&&(_this.declareType-1),
                    declareTypeTwo:_this.declareTypeTwo&&(_this.declareTypeTwo-1),
                    birthHospitalName:_this.birthHospitalName,
                    birthBabyNo:_this.birthBabyNo&&(_this.birthBabyNo-1),
                    marriageCertificate:_this.marriageCertificate&&_this.marriageCertificate.join(','),
                    medicalRecord:_this.medicalRecord&&_this.medicalRecord.join(','),
                    childbirthReceipt:_this.childbirthReceipt&&_this.childbirthReceipt.join(','),
                    womanCertificate:_this.womanCertificate&&_this.womanCertificate.join(','),
                    pregnancyPermit:_this.pregnancyPermit&&_this.pregnancyPermit.join(','),
                    birthPaymenReceipt:_this.birthPaymenReceipt&&_this.birthPaymenReceipt.join(','),
                    uploadPaymentDetail:_this.uploadPaymentDetail&&_this.uploadPaymentDetail.join(','),
                    allopatricBirth:_this.allopatricBirth&&_this.allopatricBirth.join(','),
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
        },
        btncurornot(){
            let str = ''
            if(this.applyName && this.applyCard && this.applyPhone && this.reimbursePeople && this.reimburseCardNo && this.reimbursePeopleSex && this.declareType && this.reimburseUnit){
                if(this.reimbursePeopleSex == '2'){   //女
                    return 'cur' 
                }else if(this.reimbursePeopleSex == '1'){  //男
                    if(this.declareType == '2'){
                        return 'cur'
                    }else if(this.declareType == '1' && this.declareTypeTwo){
                        return 'cur'
                    }
                }
            }
            return str
        },
        btncurornot2(){
            let str = ''
            if(this.declareType && this.declareType == '1'){
                if(this.birthHospitalName && this.birthBabyNo && this.marriageCertificate &&this.marriageCertificate.length && this.medicalRecord&& this.medicalRecord.length){
                    if(this.reimbursePeopleSex == '2' && (this.birthBabyNo > 2 && this.pregnancyPermit&&this.pregnancyPermit.length || this.birthBabyNo < 3)){
                        str = 'cur'
                    }
                    if(this.reimbursePeopleSex=='1'){
                        if((this.declareTypeTwo == '1' && this.womanCertificate && this.womanCertificate.length || this.declareTypeTwo == '2')&& (this.birthBabyNo > 2 && this.pregnancyPermit&&this.pregnancyPermit.length || this.birthBabyNo < 3)){
                            str = 'cur'
                        }
                    }
                }
            }else if(this.declareType && this.declareType == '2'){
                if(this.marriageCertificate && this.marriageCertificate.length && this.medicalRecord && this.medicalRecord.length){
                    str = 'cur'
                }
            }
            return str
        },
        clicknextStep(){
            if(this.btncurornot()){
                this.curstep = '2' 
            }
        },
        deletesth(attr,i){
            this[attr].splice(i,1)
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
    }
};
</script>

<style lang="less">

.midtitle{
    height:2rem;
    padding-left:0.48rem;
    line-height:2rem;
    border-bottom:1px solid #DDD;
    margin-top:0.24rem;
    background:#FFF;
}


</style>
