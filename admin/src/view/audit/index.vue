<template>
  <div>
    <el-tabs v-model="verifyStatus" @tab-click="handleClick">
      <el-tab-pane label="待审核" name="0"></el-tab-pane>
      <el-tab-pane label="已审核" name="1"></el-tab-pane>
    </el-tabs>
    <el-form :inline="true" size="small" :model="form" class="demo-form-inline">
      <el-form-item label="报销类型">
        <el-select
          v-model="form.type"
          placeholder="请选择报销类型"
          :clearable="true"
        >
          <el-option
            v-for="item in typeList"
            :key="item.name"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属街道">
        <el-select
          v-model="form.personStreet"
          placeholder="请选择所属街道"
          :clearable="true"
        >
          <el-option
            v-for="item in streetList"
            :key="item.medicalStreetId"
            :label="item.streetName"
            :value="item.streetName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审核结果" v-if="verifyStatus == 1">
        <el-select
          v-model="form.result"
          placeholder="请选择审核结果"
          :clearable="true"
        >
          <el-option
            v-for="item in resultList"
            :key="item.name"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关键词">
        <el-input
          placeholder="查询申请人、报销人、报销人身份证号等关键词"
          v-model="form.keywords"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search()">查询</el-button>
        <el-button @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>
    <Table
      ref="table"
      :verifyList="verifyList"
      :total="total"
      :typs="verifyStatus"
      @handleListChange="handleListChange"
    />
  </div>
</template>
<script>
import CONST from "@/data/const";
import Table from "./components/auditTable";
import { mapState } from "vuex";
export default {
  components: {
    Table,
  },
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      verifyStatus: "0",
      typeList: CONST.PAY_TYPE,
      streetList: [],
      resultList: CONST.AUDIT_RESULT,
      form: {
        type: "",
        personStreet: "",
        result: "",
        keywords: "",
      },
      verifyList: [],
      total: 0,
      limit: 0,
    };
  },
  created() {},
  mounted() {
    this.getAuditList();
    this.queryStreetList();
  },
  methods: {
    reset() {
      this.form.type = "";
      this.form.result = "";
      this.form.keywords = "";
    },
    search() {
      this.getAuditList();
    },
    handleClick() {
      this.reset();
      this.getAuditList();
    },
    async queryStreetList() {
      let param = {
        loginAccount: this.user.loginAccount, //this.user.loginAccount,
        limit: 0,
        offset: 100,
      };
      let res = await this.$http.queryStreetList(param);
      if (res && res.streetList) {
        this.streetList = res.streetList;
      }
    },
    getAuditList() {
      let param = {
        loginAccount: this.user.loginAccount,
        verifyStatus: this.verifyStatus,
        reimburseType: this.form.type,
        personStreet: this.form.personStreet,
        verifyResult: this.form.result,
        limit: this.limit,
        offset: this.$refs.table.offset,
        param: "",
      };
      this.$http.describeVerifyList(param).then((res) => {
        this.verifyList = res && res.reimburseList;
        this.total = res.size;
      });
    },
    handleListChange(v) {
      this.limit = v;
      this.getAuditList();
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
