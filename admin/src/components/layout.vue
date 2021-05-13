<template>
  <div>
    <el-header height="74px">
      <el-row>
        <el-col :span="12"><div class="icon-header-box"></div></el-col>
        <el-col :span="12" class="user-info-box">
          <span>所属机构：{{ user.orgName }}</span>
          <el-dropdown @command="handleQuit">
            <span class="el-dropdown-link">
              {{ user.accountName
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="edit">修改密码</el-dropdown-item>
              <el-dropdown-item command="quit">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <Nav />
      </el-aside>
      <el-main>
        <bread-crumb />
        <router-view class="content-box" />
      </el-main>
    </el-container>
    <el-dialog
      title="修改密码"
      width="500px"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form ref="passForm" :model="form" :rules="rules">
        <el-form-item label="原密码" label-width="100px" prop="oldPass">
          <el-input
            v-model="form.oldPass"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="100px" prop="newPass">
          <el-input
            v-model="form.newPass"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" label-width="100px" prop="checkPass">
          <el-input
            v-model="form.checkPass"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Nav from "./nav";
import breadCrumb from "./breadCrumb";
import { mapState } from "vuex";
import { encrypt } from "@/utils/tool";
export default {
  components: {
    breadCrumb,
    Nav,
  },
  computed: {
    ...mapState(["user"]),
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.form.newPass !== "") {
          this.$refs.passForm.validateField("checkPass");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.newPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: false,
      form: {
        oldPass: "",
        newPass:'',
        checkPass: "",
      },
      rules: {
        oldPass: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
        newPass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    handleQuit(command) {
      if (command == "quit") {
        sessionStorage.removeItem("userInfo")
        this.$router.push({ path: "/login" });
      } else if (command == "edit") {
        this.dialogFormVisible = true;
      }
    },
    submitForm() {
      this.$refs["passForm"].validate((valid) => {
        if (valid) {
          this.updateAccountPass()
        } else {
          return false;
        }
      });
    },
    async updateAccountPass() {
      let param = {
        loginAccount: this.user.loginAccount,
        newPass: encrypt(this.form.checkPass),
        oldPass: encrypt(this.form.oldPass),
      };
      let res = await this.$http.updateAccountPass(param);
      if (res && res.result && res.result.success) {
        this.$message.success("修改成功");
      }else {
        this.$message.error(res.result && res.result.message || '修改失败')
      }
    },
  },
};
</script>
<style lang='less' scoped>
.el-header {
  padding: 0 20px 0 0;
  background-color: #fff;
  color: #323232;
  text-align: center;
  line-height: 74px;
  border-bottom: 1px solid #ddd;
  .el-dropdown {
    cursor: pointer;
    color: #323232;
  }
  .user-info-box {
    text-align: right;
    > span:after {
      content: "|";
      display: inline-block;
      height: 0;
      background: #fff;
      margin: 0 10px;
    }
  }
  .icon-header-box {
    width: 200px;
    height: 73px;
    background: #4b83f3;
    &:after {
      content: "";
      text-align: left;
      width: 161px;
      height: 28px;
      display: inline-block;
      background: url("~@/assets/icon-header.png") no-repeat;
      background-size: 100% 100%;
      vertical-align: middle;
    }
  }
}
.el-aside {
  min-height: calc(100vh - 74px);
  /deep/ .el-submenu {
    min-width: 200px;
  }
}
.el-main {
  text-align: left;
  padding: 0;
  .content-box {
    padding: 0 20px;
  }
}
</style>
