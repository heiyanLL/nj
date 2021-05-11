<template>
    <div class="jumin">
        <div class="loagMask2" v-if="loading"><div class="mask-loading fixedLoading"></div></div>
        <div class="toptitle">生育医保报销</div>
        <div class="step-list">
            <div class="step cur" @click="curstep='1'"><em>1</em>填写报销人信息</div><span></span>   
            <div :class="['step',curstep=='2'?'cur':'']"><em>2</em>提交报销资料</div><span></span>
            <div class="step"><em>3</em>申报完成</div>
        </div>
        <template v-if="curstep == '1'">
            <div class="question-bar">
                <div class="attr"><em>*</em>申请人</div>
                <div class="answer-list ipt">
                    <input type="text" placeholder="请输入申请人姓名" maxlength="10" v-model="applyName" />
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
            <div class="toptitle">生育或计生手术当月所在参保单位</div>
            <div class="question-bar">
                <div class="attr"><em>*</em>参保单位</div>
                <div class="answer-list ipt"><input type="text" placeholder="请输入参保单位" v-model="reimburseUnit"/></div>
            </div>
            <div class="question-bar">
                <div class="attr"><em>*</em>单位社保代码</div>
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
                    <div class="answer-list ipt"><input type="text" placeholder="请输入生育医院名称" maxlength="10" v-model="birthHospitalName" /></div>
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
                <div class="midtitle" v-if="reimbursePeopleSex=='1'&&declareTypeTwo=='1'">护理假津贴、男职工配偶分娩报销</div>   
                <div class="midtitle" v-if="reimbursePeopleSex=='1'&&declareTypeTwo=='2'">护理假津贴</div>
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
                            <input ref="uploadInput" type="file" multiple class='upinp' name="file" value="" accept="image/gif,image/jpeg,image/jpg,image/png" @change="selectImg($event,'marriageCertificate')"/>
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
                            <input ref="uploadInput" type="file" multiple class='upinp' name="file" value="" accept="image/gif,image/jpeg,image/jpg,image/png" @change="selectImg($event,'medicalRecord')"/>
                        </div>
                    </div>
                </div>
                <div class="question-bar" v-if="reimbursePeopleSex=='1'&&declareTypeTwo=='1' || reimbursePeopleSex=='2'">
                    <div class="attr bottom-none"><em>*</em>上传产检及分娩发票</div>
                    <div class="twotips">
                        1、如在江北新区17家医疗机构就诊，可上传缴费凭条；<br/>
                        <!-- 2、查看<a href="" class="desctip">17家医疗机构</a>和<a href="" class="desctip">缴费凭证示例</a> -->
                        2、查看<a href="" class="desctip">缴费凭证示例</a>
                    </div>
                    <div class="upfile">
                        <div class="operation-div">
                            <div class="img-wrap" v-for="(v,i) in childbirthReceipt" :key="i">
                                <em class="close" @click="deletesth('childbirthReceipt',i)"></em>
                                <img class="shoImg" :src="v | imageUrl">
                            </div>
                        </div>
                        <div class="file-wrap">
                            <input ref="uploadInput" type="file" multiple class='upinp' name="file" value="" accept="image/gif,image/jpeg,image/jpg,image/png" @change="selectImg($event,'childbirthReceipt')"/>
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
                            <input ref="uploadInput" type="file" multiple class='upinp' name="file" value="" accept="image/gif,image/jpeg,image/jpg,image/png" @change="selectImg($event,'womanCertificate')"/>
                        </div>
                    </div>
                </div>
                <div class="question-bar">
                    <div class="attr bottom-none">上传准生证</div>
                    <div class="upfile">
                        <div class="operation-div">
                            <div class="img-wrap" v-for="(v,i) in pregnancyPermit" :key="i">
                                <em class="close" @click="deletesth('pregnancyPermit',i)"></em>
                                <img class="shoImg" :src="v | imageUrl">
                            </div>
                        </div>
                        <div class="file-wrap">
                            <input ref="uploadInput" type="file" multiple class='upinp' name="file" value="" accept="image/gif,image/jpeg,image/jpg,image/png" @change="selectImg($event,'pregnancyPermit')"/>
                        </div>
                    </div>
                </div>
            </template>
            <!-- 计生相关 -->
            <template v-if="declareType=='2'">
                <div class="midtitle">计生手术报销</div>
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
                            <input ref="uploadInput" type="file" multiple class='upinp' name="file" value="" accept="image/gif,image/jpeg,image/jpg,image/png" @change="selectImg($event,'marriageCertificate')"/>
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
                            <input ref="uploadInput" type="file" multiple class='upinp' name="file" value="" accept="image/gif,image/jpeg,image/jpg,image/png" @change="selectImg($event,'medicalRecord')"/>
                        </div>
                    </div>
                </div>
                <div class="question-bar">
                    <div class="attr bottom-none"><em>*</em>计生费用发票</div>
                    <div class="twotips">
                        1、如在江北新区17家医疗机构就诊，可上传缴费凭条；<br/>
                        <!-- 2、查看<a href="" class="desctip">17家医疗机构</a>和<a href="" class="desctip">缴费凭证示例</a> -->
                        2、查看<a href="" class="desctip">缴费凭证示例</a>
                    </div>
                    <div class="upfile">
                        <div class="operation-div">
                            <div class="img-wrap" v-for="(v,i) in birthPaymenReceipt" :key="i">
                                <em class="close" @click="deletesth('birthPaymenReceipt',i)"></em>
                                <img class="shoImg" :src="v | imageUrl">
                            </div>
                        </div>
                        <div class="file-wrap">
                            <input ref="uploadInput" type="file" multiple class='upinp' name="file" value="" accept="image/gif,image/jpeg,image/jpg,image/png" @change="selectImg($event,'birthPaymenReceipt')"/>
                        </div>
                    </div>
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
            birthHospitalName:'',
            popbox2:false
        }
    },
    watch: {
        
    },
    computed:{
        
    },
    created() {
        
    },
    mounted() {
        
    },
    methods: {
        submit(){
            let _this = this
            _this.loading = true
            _this.$axios.post(`${_this.hosts.szjb1}/medical/reimburse/reimburseSubmit`,{       
                wechatId:window.privateInfo.openid,
                reimburseCardNo:_this.reimburseCardNo,
                reimbursePhone:_this.reimbursePhone,
                reimburseRelate:_this.reimburseRelate,
                reimburseType:'2',
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
        },
        btncurornot(){
            let str = ''
            if(this.applyName && this.applyCard && this.applyPhone && this.reimbursePeople && this.reimbursePeopleSex && this.declareType){
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
                if(this.birthHospitalName && this.birthBabyNo && this.marriageCertificate && this.medicalRecord){
                    if(this.reimbursePeopleSex == '2' && this.childbirthReceipt && this.childbirthReceipt.length){
                        str = 'cur'
                    }
                    if(this.reimbursePeopleSex=='1'){
                        if(this.declareTypeTwo == '1' && this.childbirthReceipt && this.childbirthReceipt.length && this.womanCertificate && this.womanCertificate.length || this.declareTypeTwo == '2'){
                            str = 'cur'
                        }
                    }
                }
            }else if(this.declareType && this.declareType == '2'){
                if(this.marriageCertificate && this.marriageCertificate.length && this.medicalRecord && this.medicalRecord.length && this.birthPaymenReceipt && this.birthPaymenReceipt.length){
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
        }
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
