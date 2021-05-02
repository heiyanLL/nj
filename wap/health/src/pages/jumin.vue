<template>
    <div class="jumin">
        
        <div class="ifself" v-if="!selfshenb && !othershenb">
            <a href="javascript:;" @click="selfshenb=true">自己申报</a>
            <a href="javascript:;" @click="othershenb=true">帮别人申报</a>
        </div>
        <template v-if="selfshenb || othershenb">
            <div class="toptitle">居民医保报销</div>
            <div class="step-list">
                <div class="step cur" @click="curstep='1'"><em>1</em>填写报销人信息</div>
                <div :class="['step',curstep=='2'?'cur':'']"><em>2</em>提交报销资料</div>
                <div class="step"><em>3</em>申报完成</div>
            </div>
            <template v-if="curstep == '1'">
                <div class="question-bar">
                    <div class="attr"><em>*</em>报销人</div>
                    <div class="answer-list ipt">
                        <input type="text" v-if="selfshenb" placeholder="请输入报销人姓名" maxlength="10" v-model="selfname" />
                        <input type="text" v-if="othershenb" placeholder="请输入报销人姓名" maxlength="10" v-model="othername" />
                    </div>
                </div>

                <div class="question-bar" v-if="othershenb">
                    <div class="attr"><em>*</em>报销人社保卡</div>
                    <div class="upfile">
                        <div class="operation-div">
                            <img class="shoImg" :src="imgDefault">
                        </div>
                        <div class="file-wrap">
                            <input ref="uploadInput" type="file" class='upinp' name="file" value="" accept="image/gif,image/jpeg,image/jpg,image/png" @change="selectImg($event)"/>
                        </div>
                        <!-- {{othercard}} -->
                        <!-- 显示上传图片的区域 -->
                        
                    </div>
                </div>

                <div class="question-bar" v-if="othershenb">
                    <div class="attr"><em>*</em>与报销人关系</div>
                    <div class="answer-list ipt"><input type="text" placeholder="请输入与报销人关系" maxlength="10" v-model="relation" /></div>
                </div>

                <div class="question-bar">
                    <div class="attr"><em>*</em>所在街道</div>
                    <input type="hidden" :name="'su_id'+'personStreet'" :id="'suId'+'personStreet'" v-model="personStreet" />
                    <div class="answer-list" :id="'showGeneral'+'personStreet'" @click="showModelOne('personStreet')">{{personStreet}}</div>
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
                    <input type="hidden" :name="'su_id'+'visitHospitalName'" :id="'suId'+'visitHospitalName'" v-model="visitHospitalName" />
                    <div class="answer-list" :id="'showGeneral'+'visitHospitalName'" @click="showModelOne('visitHospitalName')">{{visitHospitalName}}</div>
                </div>

                <div :class="['next-step',btncurornot()]" @click="clicknextStep()">下一步</div>

            </template>
            <template v-if="curstep=='2'">
                <div class="question-bar" v-if="visitHospitalArea=='1'">
                    <div class="attr"><em>*</em>上传缴费凭条</div>
                    <div class="upfile">
                        <div class="operation-div">
                            <img class="shoImg" :src="imgDefault">
                        </div>
                        <div class="file-wrap">
                            <input ref="uploadInput" type="file" class='upinp' name="file" value="" accept="image/gif,image/jpeg,image/jpg,image/png" @change="selectImg($event)"/>
                        </div>
                        <!-- {{paymentPic}} -->
                        <!-- 显示上传图片的区域 -->
                    </div>
                </div>

                <div class="question-bar" v-if="visitHospitalArea=='2'">
                    <div class="attr"><em>*</em>就医类型</div>
                    <!-- {{visitType}} -->
                    <div class="answer-list ipt">
                        <div class="radio-btn" @click="visitType='2'"><em :class="['round',visitType=='2'?'cur':'']"></em>住院</div>
                        <div class="radio-btn" @click="visitType='1'"><em :class="['round',visitType=='1'?'cur':'']"></em>门诊</div>
                    </div>
                </div>
                <template v-if="visitHospitalArea=='2'">
                    <div class="question-bar">
                        <div class="attr"><em>*</em>上传发票（请确保上传的图像清晰）</div>
                        <div class="upfile">
                            <div class="operation-div">
                                <img class="shoImg" :src="imgDefault">
                            </div>
                            <div class="file-wrap">
                                <input ref="uploadInput" type="file" class='upinp' name="file" value="" accept="image/gif,image/jpeg,image/jpg,image/png" @change="selectImg($event)"/>
                            </div>
                            <!-- {{visitReceipt}} -->
                            <!-- 显示上传图片的区域 -->
                            
                        </div>
                    </div>

                    <div class="question-bar">
                        <div class="attr"><em>*</em>上传费用说明（请确保上传的图像清晰）</div>
                        <div class="upfile">
                            <div class="operation-div">
                                <img class="shoImg" :src="imgDefault">
                            </div>
                            <div class="file-wrap">
                                <input ref="uploadInput" type="file" class='upinp' name="file" value="" accept="image/gif,image/jpeg,image/jpg,image/png" @change="selectImg($event)"/>
                            </div>
                            <!-- {{fapiaoshuoming}} -->
                            <!-- 显示上传图片的区域 -->
                            
                        </div>
                    </div>    

                    <div class="question-bar" v-if="visitType=='2'">
                        <div class="attr"><em>*</em>上传出院小结（请确保上传的图像清晰）</div>
                        <div class="upfile">
                            <div class="operation-div">
                                <img class="shoImg" :src="imgDefault">
                            </div>
                            <div class="file-wrap">
                                <input ref="uploadInput" type="file" class='upinp' name="file" value="" accept="image/gif,image/jpeg,image/jpg,image/png" @change="selectImg($event)"/>
                            </div>
                            <!-- {{visitEndRecord}} -->
                            <!-- 显示上传图片的区域 -->
                            
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
                        <div class="answer-list ipt" @click="showModelTwo">
                            <!-- bankCountry -->
                            <!-- bankCity -->
                            <input type="hidden" name="contact_province_code" data-id="0001" id="contact_province_code" value="" data-province-name="">  
                            <input type="hidden" name="contact_city_code" id="contact_city_code" value="" data-city-name=""/>
                            <span data-city-code="510100" data-province-code="510000" data-district-code="510105" id="show_contact"></span> 
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

                <div :class="['next-step']" @click="submit()">提交</div>
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
            curstep:'1',
            selfshenb:false,
            othershenb:false,
            selfname:'',
            othername:'',
            othercard:'',
            relation:'',
            personStreet:'',
            visitHospitalArea:'',   //1南京2异地
            visitHospitalName:'',
            paymentPic:'',
            visitType:'',  //1门诊2住院
            visitReceipt:'',
            fapiaoshuoming:'',
            chuyuanxiaojie:'',
            reimbursePayType:'',   //1社保卡2银行卡
            bankCountry:'',
            bankCity:'',
            bankName:'',
            backNo:'',
            questionList:{
                personStreet:[
                    {'id': '104000000020', 'value': '街道1'},
                    {'id': '104000000010', 'value': '街道2'}
                ],
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
        
    },
    methods: {
        clickshebao(){
            if(this.reimbursePayType != '1'){
                this.popbox = true
            }
        },
        btncurornot(){
            let str = ''
            if(this.selfshenb){
                if(this.selfname&&this.personStreet){
                    if(this.visitHospitalArea == '1'){
                        if(this.visitHospitalName){
                            str = 'cur'
                        }
                    }else if(this.visitHospitalArea == '2'){
                        str = 'cur'
                    }
                }
            }else if(this.othershenb){
                if(this.othername&&this.othercard&&this.relation){
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
                        _this.bankCountry = selectOneObj.value;
                        _this.bankCity = selectTwoObj.value;
                    }
            });
        }
    }
};
</script>

<style lang="less">
    

</style>
