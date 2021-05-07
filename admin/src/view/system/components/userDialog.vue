<template>
  <div>
    <el-dialog
      width="500px"
      :title="title"
      :visible.sync="dialogFormVisible"
      @close="handleClose"
    >
      <el-form :model="info" label-width="80px" size="small">
        <el-form-item label="登录账号">
          <el-input v-model="info.loginAccount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属机构">
          <el-select v-model="info.region" placeholder="请选择所属机构">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="info.accountName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户角色">
          <el-radio-group v-model="info.accountRole">
            <el-radio
              v-for="item in roleList"
              :key="item.name"
              :label="item.value"
              >{{ item.name }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="updateOrInsertAccount"
          >保 存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import CONST from "@/data/const";
import { mapState } from "vuex";
export default {
  name: "dialog",
  props: {
    dialogFormVisible: Boolean,
    info: Object,
  },
  data() {
    return {
      roleList: CONST.ROLE_LIST,
    };
  },
  computed: {
    ...mapState(["user"]),
    title() {
      return this.info.medicalAccountId ? "修改账号" : "添加账号";
    },
  },
  methods: {
    handleClose() {
      this.$emit("handleClose");
    },
    async updateOrInsertAccount() {
      let param = {
        medicalAccountId: this.info.medicalAccountId || "",
        loginAccount: this.info.loginAccount,
        accountName: this.info.accountName,
        orgId: "",
        orgName: this.info.orgName,
        accountRole: this.info.accountRole,
      };
      let res = this.$http.updateOrInsertAccount(param);
      console.log(res);
    },
  },
};
</script>
<style lang='less' scoped>
</style>