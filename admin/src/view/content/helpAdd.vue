<template>
  <div>
    <el-form label-width="80px" :model="form">
      <el-form-item label="所属类型">
        <el-radio-group v-model="form.reimburseType">
          <el-radio
            v-for="item in payList"
            :key="item.value"
            :label="item.value"
            >{{ item.name }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="常见问题" prop="normalQuestion">
        <el-input v-model="form.normalQuestion"></el-input>
      </el-form-item>
      <el-form-item label="问题解答" prop="answerQuestion">
        <el-input :rows="10" type="textarea" v-model="form.answerQuestion"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import CONST from "@/data/const";
export default {
  data() {
    return {
      payList: CONST.PAY_TYPE,
      form: {
        medicalHelpId: "",
        reimburseType: '0',
        normalQuestion: "",
        answerQuestion: ""
      },
    };
  },
  mounted() {
    this.helpGet();
  },
  methods: {
    async helpGet() {
      const id = this.$route.params.id
      if(!id) return
      let res = await this.$http.helpGet({medicalHelpId: id})
      if(res && res.medicalHelp) {
        this.form = {...this.form, ...res.medicalHelp}
      }
    },
    async updateOrInsertHelp() {
      let param = {
        medicalHelpId:this.form.medicalHelpId,
        reimburseType:this.form.reimburseType,
        normalQuestion:this.form.normalQuestion,
        answerQuestion:this.form.answerQuestion,
      };
      let res = await this.$http.updateOrInsertHelp(param);
      if(res && res.result && res.result.success) {
          this.$router.push({path: '/content/help'})
      }
    },
    onSubmit() {
        this.updateOrInsertHelp()
    }
  },
};
</script>
<style lang='less' scoped>
.el-form {
  width: 500px;
}
</style>
