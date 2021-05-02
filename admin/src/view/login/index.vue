<template>
    <div class="login-container">
      <el-form :model="form">
        <el-form-item>
          <h1>医保零星报销审批系统</h1>
        </el-form-item>
        <el-form-item>
          <el-input
              placeholder="请输入账号"
              prefix-icon="el-icon-s-custom"
              v-model="form.admin">
            </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              v-model="form.password">
            </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>
export default {
   data() {
      return {
        form:{

        }
      }
   },
   methods: {
     handleLogin() {
       this.$router.push({path: '/'})
     }
   }
}
</script>
<style lang='less' scoped>
.login-container{
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url('~@/assets/11.jpeg');
  .el-form{
    width: 300px;
    height: 300px;
    padding: 50px;
    position: absolute;
    border-radius: 12px;
    left: 50%;
    top: 50%;
    background: #fff;
    transform: translate(-50%, -50%);
    .el-button{
      width: 100%;
      margin-top: 50px;
    }
  }
}

</style>
