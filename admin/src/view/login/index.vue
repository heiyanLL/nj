<template>
  <div class="login-container">
    <el-form :model="form">
      <el-form-item>
        <h1>江北医疗云报销</h1>
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="请输入账号"
          prefix-icon="el-icon-s-custom"
          v-model="form.loginAccount"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          type="password"
          show-password
          v-model="form.passWord"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import { encrypt } from "@/utils/tool";
export default {
  data() {
    return {
      form: {
        loginAccount: "",
        passWord: "",
      },
    };
  },
  computed: {
    formEncrypt() {
      return {
        loginAccount: this.form.loginAccount,
        passWord: encrypt(this.form.passWord),
      }
    }
  },
  methods: {
    ...mapMutations(["SET_USER"]),
    async handleLogin() {
      let res = await this.$http.login(this.formEncrypt);
      if (res && res.result && res.result.success) {
        this.SET_USER(res.accountList[0]);
        this.$router.push({ path: "/" });
      }else {
        this.$message.error(res.result && res.result.message || '登陆失败，请稍后')
      }
    },
  },
};
</script>
<style lang='less' scoped>
.login-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url("~@/assets/home.png");
  background-size: cover;
  .el-form {
    width: 300px;
    height: 300px;
    padding: 50px;
    position: absolute;
    border-radius: 12px;
    right: 200px;
    top: 50%;
    background: #fff;
    transform: translate(0, -50%);
    .el-button {
      width: 100%;
      margin-top: 50px;
    }
  }
}
</style>
