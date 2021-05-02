<template>
    <div class="jumin">
        <div class="toptitle">生育医保报销</div>
        <div class="step-list">
            <div class="step cur" @click="curstep='1'"><em>1</em>填写报销人信息</div>
            <div :class="['step',curstep=='2'?'cur':'']"><em>2</em>提交报销资料</div>
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
                <div class="answer-list ipt"><input type="text" placeholder="请输入参保单位"/></div>
            </div>
            <div class="question-bar">
                <div class="attr"><em>*</em>单位社保代码</div>
                <div class="answer-list ipt"><input type="text" placeholder="请输入单位社保代码" /></div>
            </div>
            <div class="question-bar">
                <div class="attr"><em>*</em>报销人</div>
                <div class="answer-list ipt"><input type="text" placeholder="请输入报销人姓名" maxlength="10" v-model="reimbursePeople" /></div>
            </div>
            <div class="question-bar">
                <div class="attr"><em>*</em>报销人身份证号</div>
                <div class="answer-list ipt"><input type="text" placeholder="请输入报销人身份证号" v-model="selftel" /></div>
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
                <div class="midtitle" v-if="reimbursePeopleSex=='1'&&declareType=='1'&&declareTypeTwo=='1'">护理假津贴、男职工配偶分娩报销</div>   
                <div class="midtitle" v-if="reimbursePeopleSex=='1'&&declareType=='1'&&declareTypeTwo=='2'">护理假津贴</div>
                <div class="midtitle" v-if="reimbursePeopleSex=='2'&&declareType=='1'">津贴及营养费、分娩费用报销</div>
            
                <div class="question-bar">
                    <div class="attr"><em>*</em>上传结婚证或离婚证<span class="a1">（请确保上传的图像清晰）</span></div>
                    <div class="upfile">
                        <div class="operation-div">
                            <img class="shoImg" :src="imgDefault">
                        </div>
                        <div class="file-wrap">
                            <input ref="uploadInput" type="file" class='upinp' name="file" value="" accept="image/gif,image/jpeg,image/jpg,image/png" @change="selectImg($event)"/>
                        </div>
                        <!-- {{marriageCertificate}} -->
                        <!-- 显示上传图片的区域 -->
                    </div>
                </div>
                <div class="question-bar">
                    <div class="attr">上传出院小结或者门诊病历<span class="a1">（请确保上传的图像清晰）</span></div>
                    <div class="upfile">
                        <div class="operation-div">
                            <img class="shoImg" :src="imgDefault">
                        </div>
                        <div class="file-wrap">
                            <input ref="uploadInput" type="file" class='upinp' name="file" value="" accept="image/gif,image/jpeg,image/jpg,image/png" @change="selectImg($event)"/>
                        </div>
                        <!-- {{medicalRecord}} -->
                        <!-- 显示上传图片的区域 -->
                    </div>
                </div>
                <div class="question-bar" v-if="reimbursePeopleSex=='1'&&declareType=='1'&&declareTypeTwo=='1' || reimbursePeopleSex=='2'&&declareType=='1'">
                    <div class="attr">上传产检及分娩发票<span class="a1">（请确保上传的图像清晰）</span></div>
                    <div class="twotips">
                        1、如在江北新区17家医疗机构就诊，可上传缴费凭条；<br/>
                        2、查看<a href="">17家医疗机构</a>和<a href="">缴费凭证示例</a>
                    </div>
                    <div class="upfile">
                        <div class="operation-div">
                            <img class="shoImg" :src="imgDefault">
                        </div>
                        <div class="file-wrap">
                            <input ref="uploadInput" type="file" class='upinp' name="file" value="" accept="image/gif,image/jpeg,image/jpg,image/png" @change="selectImg($event)"/>
                        </div>
                        <!-- {{childbirthReceipt}} -->
                        <!-- 显示上传图片的区域 -->
                        
                    </div>
                </div>
                    
                <div class="question-bar" v-if="reimbursePeopleSex=='1'&&declareType=='1'&&declareTypeTwo=='1'">
                    <div class="attr">上传女方无业证明或者创业就业登记证<span class="a1">（请确保上传的图像清晰）</span></div>
                    <div class="upfile">
                        <div class="operation-div">
                            <img class="shoImg" :src="imgDefault">
                        </div>
                        <div class="file-wrap">
                            <input ref="uploadInput" type="file" class='upinp' name="file" value="" accept="image/gif,image/jpeg,image/jpg,image/png" @change="selectImg($event)"/>
                        </div>
                        <!-- {{womanCertificate}} -->
                        <!-- 显示上传图片的区域 -->
                       
                    </div>
                </div>
                <div class="question-bar">
                    <div class="attr">上传准生证<span class="a1">（请确保上传的图像清晰）</span></div>
                    <div class="upfile">
                        <div class="operation-div">
                            <img class="shoImg" :src="imgDefault">
                        </div>
                        <div class="file-wrap">
                            <input ref="uploadInput" type="file" class='upinp' name="file" value="" accept="image/gif,image/jpeg,image/jpg,image/png" @change="selectImg($event)"/>
                        </div>
                        <!-- {{pregnancyPermit}} -->
                        <!-- 显示上传图片的区域 -->
                        
                    </div>
                </div>
            </template>
            <!-- 计生相关 -->
            <template v-if="declareType=='2'">
                <div class="midtitle">计生手术报销</div>
                <div class="question-bar">
                    <div class="attr"><em>*</em>上传结婚证或离婚证<span class="a1">（请确保上传的图像清晰）</span></div>
                    <div class="upfile">
                        <div class="operation-div">
                            <img class="shoImg" :src="imgDefault">
                        </div>
                        <div class="file-wrap">
                            <input ref="uploadInput" type="file" class='upinp' name="file" value="" accept="image/gif,image/jpeg,image/jpg,image/png" @change="selectImg($event)"/>
                        </div>
                        <!-- {{marriageCertificate}} -->
                        <!-- 显示上传图片的区域 -->
                       
                    </div>
                </div>
                <div class="question-bar">
                    <div class="attr">上传出院小结或者门诊病历<span class="a1">（请确保上传的图像清晰）</span></div>
                    <div class="upfile">
                        <div class="operation-div">
                            <img class="shoImg" :src="imgDefault">
                        </div>
                        <div class="file-wrap">
                            <input ref="uploadInput" type="file" class='upinp' name="file" value="" accept="image/gif,image/jpeg,image/jpg,image/png" @change="selectImg($event)"/>
                        </div>
                        <!-- {{medicalRecord}} -->
                        <!-- 显示上传图片的区域 -->
                        
                    </div>
                </div>
                <div class="question-bar">
                    <div class="attr">计生费用发票<span class="a1">（请确保上传的图像清晰）</span></div>
                    <div class="twotips">
                        1、如在江北新区17家医疗机构就诊，可上传缴费凭条；<br/>
                        2、查看<a href="">17家医疗机构</a>和<a href="">缴费凭证示例</a>
                    </div>
                    <div class="upfile">
                        <div class="operation-div">
                            <img class="shoImg" :src="imgDefault">
                        </div>
                        <div class="file-wrap">
                            <input ref="uploadInput" type="file" class='upinp' name="file" value="" accept="image/gif,image/jpeg,image/jpg,image/png" @change="selectImg($event)"/>
                        </div>
                        <!-- {{}} -->
                        <!-- 显示上传图片的区域 -->
                        
                    </div>
                </div>
            </template>
            
            <div :class="['next-step']" @click="submit()">提交</div>
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
            curstep:'1',
            applyName:'',
            applyCard:'',
            applyPhone:'',
            // 参保单位
            // 参保社保代码
            reimbursePeople:'',
            // 报销人身份证号
            reimbursePeopleSex:'',
            declareType:'',
            declareTypeTwo:'',
            birthBabyNo:'',
            marriageCertificate:'',
            medicalRecord:'',
            childbirthReceipt:'',
            womanCertificate:'',
            pregnancyPermit:'',
            // 计生费用发票
            birthHospitalName:'',
            birthHospitalName:'',
            questionList:{
                hospital:[
                    {'id': '104000000020', 'value': '医院1'},
                    {'id': '104000000010', 'value': '医院2'}
                ]
            },
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
        clickshebao(){
           
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
        clicknextStep(){
            if(this.btncurornot()){
                this.curstep = '2' 
            }
        },
        selectImg(e){
            const imgFile = e.target.files[0];
            console.log(imgFile)
            if (imgFile){ 
                this.operationShow = true
                if(this.checkFile(imgFile)){
                    this.upload(imgFile);
                }
            }
        },
        checkFile(file){
            // var suffix = /\.[^\.]+$/.exec($('#' + e.target.id).val());
            // var f = $('#' + e.target.id)[0] && $('#' + e.target.id)[0].files && $('#' + e.target.id)[0].files[0];
            // var size = f && f.size;
            // if (!(/(\.|\/)(jpg|jpeg|png)$/i.test(suffix[0]))) {
            //     $('#' + e.target.id).val('');
            //     // util.toaster('图片格式不正确,请重新上传');
            //     Wap.AlertBox({
            //         type:"mini",
            //         msg:"图片格式不正确,请重新上传"
            //     })
            // } else if (size > 2 * 1024 * 1024) {
            //     $('#' + e.target.id).val('');
            //     Wap.AlertBox({
            //         type:"mini",
            //         msg:"图片大小应不超过2M"
            //     })
            //     //util.toaster('图片大小应不超过2M');
            // } 

            if (file === null || file === undefined) {
                alert("请选择您要上传的文件！");
                return false;
            }else{
                return true;
            }
            let size = Math.floor(file.size / 1024);
            // 这个条件还得改
            if (size!=0) {
                return true;
            }else{
                return false
            }
        },
        upload(file){
            try {
                let self = this;
                var result='';
                //执行上传操作
                var xhr = new XMLHttpRequest();
                xhr.open("post", ApiUrl+"/member/image/upload", true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            let returnData = $.parseJSON(xhr.responseText);
                            if (!returnData) throw new Error("上传失败SERVER");
                            if (!returnData.code) throw new Error("上传失败SERVER")
                            if (returnData.code == 200) {
                                alert("上传成功")
                                //显示图片地址
                                self.$emit('change-img',returnData.name);
                                self.defaultImg = returnData.url;
                            } else {
                                alert("上传失败SERVER")
                            }
                            console.log(""+returnDate)
                        } else {
                            alert("上传失败")
                        }
                    };
                };
                var token = getMemberToken();
                //表单数据
                var fd = new FormData();
                fd.append("token", token);
                fd.append("file", file);
                //执行发送
                result = xhr.send(fd);
            } catch (e) {
                console.log(e);
                // alert(e);
            }
        },
        showModelOne(i){
            let _this = this
                
            let showBankDom = document.querySelector('#showGeneral'+i);
            let bankIdDom = document.querySelector('#suId'+i);
            
            let bankId = showBankDom.dataset['id'];
            let bankName = showBankDom.dataset['value'];
            
            setTimeout(function(){
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
                            showBankDom.dataset['id'] = selectOneObj.id;
                            showBankDom.dataset['value'] = selectOneObj.value;
                        },
                        fallback(){
                            
                        }
                });
            },20)
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
                    title: '地址选择',
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
        }
    }
};
</script>

<style lang="less">
.toptitle{
    width:14.04rem;
    height:1.5rem;
    line-height:1.5rem;
    margin:0 auto;
}
.midtitle{
    height:2rem;
    padding-left:0.48rem;
    line-height:2rem;
    border-bottom:1px solid #DDD;
    margin-top:0.24rem;
    background:#FFF;
}
.twotips{
    width:14.04rem;
    margin:0 auto;
    a{
        color:red;
    }
}

</style>
