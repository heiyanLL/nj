<template>
  <div>
    <el-form :inline="true" size="small" :model="form">
      <el-form-item label="所属街道">
        <el-select
          v-model="form.streetName"
          :clearable="true"
          placeholder="请选择所属街道"
        >
          <el-option
            v-for="item in orgList"
            :key="item.medicalStreetId"
            :label="item.streetName"
            :value="item.medicalStreetId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户角色">
        <el-select
          v-model="form.accountRole"
          :clearable="true"
          placeholder="请选择用户角色"
        >
          <el-option
            v-for="item in userList"
            :key="item.name"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关键词">
        <el-input v-model="form.param" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button type="info" @click="handleReset">重置</el-button>
        <el-button @click="addAccount" v-if="user.accountRole == '1'">添加账号</el-button>
      </el-form-item>
    </el-form>
    <Table
      ref="table"
      :accountList="accountList"
      :total="total"
      @handleTable="handleTable"
      @handleListChange="handleListChange"
    />
    <Dialog
      :dialogFormVisible="dialogFormVisible"
      :info="roleInfo"
      :orgList="orgList"
      @updateOrInsertAccount="updateOrInsertAccount"
      @handleClose="dialogFormVisible = false"
    />
  </div>
</template>
<script>
import CONST from "@/data/const";
import Table from "./components/table";
import Dialog from "./components/userDialog";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["user"]),
  },
  components: {
    Table,
    Dialog,
  },
  data() {
    return {
      orgList: [],
      total: 0,
      userList: CONST.ROLE_LIST,
      form: {
        orgName: "",
        accountRole: "",
        param: "",
      },
      dialogFormVisible: false,
      accountList: [],
      roleInfo: {},
      limit: 1,
    };
  },
  mounted() {
    this.queryAccountList();
    this.queryOrgList();
  },
  methods: {
    async queryAccountList() {
      let param = {
        loginAccount: this.user.loginAccount,
        ...this.form,
        limit: this.limit,
        offset: this.$refs.table.offset,
      };
      let res = await this.$http.queryAccountList(param);
      if (res && res.accountList) {
        this.accountList = res.accountList;
        this.total = res.size
      }
    },
    async queryOrgList() {
      let param = {
        loginAccount: this.user.loginAccount,
        limit: this.limit,
        offset: this.offset,
        param: "",
      };
      let res = await this.$http.queryStreet(param);
      if (res && res.streetList) {
        this.orgList = res.streetList;
      }
    },
    handleQuery(e, reset) {
      if (reset) this.initParam();
      this.queryAccountList();
    },
    handleReset(e) {
      this.handleQuery(e, "reset");
    },
    handleListChange(limit) {
      this.limit = limit;
      this.queryAccountList();
    },
    addAccount() {
      this.roleInfo = {};
      this.dialogFormVisible = true;
    },
    updateOrInsertAccount() {
      this.dialogFormVisible = false;
      this.initParam();
      this.queryAccountList();
    },
    handleTable(scope, type) {
      if (type == "edit") {
        this.roleInfo = scope;
        this.dialogFormVisible = true;
      } else if (type == "delete") {
        this.$confirm("您确定要删除吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$http
              .deleteAccountById({ medicalAccountId: scope.medicalAccountId,loginAccount: this.user.loginAccount })
              .then((res) => {
                if (res && res.result && res.result.success) {
                  this.$message.success("删除成功!");
                  this.queryAccountList();
                }
              });
          })
          .catch(() => {});
      } else {
        this.$confirm(
          `您确定要对 ${scope.accountName} 账号密码重置吗？`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
          }
        )
          .then(() => {
            let param = {
              loginAccount: this.user.loginAccount,
              operationAccount: scope.loginAccount
            }
            this.$http.initializationPassWord(param).then(res => {
              if(res && res.result && res.result.success) {
                this.$message.success("重置成功")
              }
            })
          })
          .catch(() => {});
      }
    },
    initParam() {
      this.limit = 1;
      this.form = {
        orgName: "",
        accountRole: "",
        param: "",
      };
      this.$refs.table.offset = CONST.PAGE_SIZE;
    },
  },
};
</script>
<style lang='less' scoped>
.el-form {
  text-align: left;
  .el-input {
    width: 330px;
  }
}
</style>
