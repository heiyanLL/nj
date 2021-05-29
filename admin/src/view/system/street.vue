<template>
  <div>
    <el-form :inline="true" size="small" :model="form">
      <el-form-item label="关键词">
        <el-input
          v-model="form.param"
          placeholder=""
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button type="info" @click="handleReset">重置</el-button>
        <el-button @click="addOrg" v-if="user.accountRole == '1'">添加街道</el-button>
      </el-form-item>
    </el-form>
    <Table
      ref="table"
      :orgList="orgList"
      :total="total"
      @handleTable="handleTable"
      @handleListChange="handleListChange"
    />
    <groupDialog
      :dialogFormVisible="dialogFormVisible"
      :info="groupInfo"
      @handleClose="dialogFormVisible = false"
      @updateOrInsertOrg="updateOrInsertOrg"
    />
  </div>
</template>
<script>
import CONST from "@/data/const";
import Table from "./components/streetTable";
import groupDialog from "./components/streetDialog";
import { mapState } from "vuex";
export default {
  components: {
    Table,
    groupDialog,
  },
  data() {
    return {
      dialogFormVisible: false,
      total: 0,
      form: {
        param: "",
      },
      orgList: [],
      groupInfo: {},
      limit: 0,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    this.queryOrgList();
  },
  methods: {
    async queryOrgList() {
      let param = {
        loginAccount: this.user.loginAccount,
        limit: this.limit,
        offset:  this.$refs.table.offset,
        ...this.form
      }
      let res = await this.$http.queryStreet(param);
      if (res && res.streetList) {
        this.orgList = res.streetList;
        this.total = res.size;
      }
    },
    handleQuery(e, reset) {
      if (reset) {
        this.form = {
          param: "",
        };
      }
      this.limit = 0;
      this.$refs.table.offset = CONST.PAGE_SIZE;
      this.queryOrgList();
    },
    handleReset(e) {
      this.handleQuery(e, "reset");
    },
    handleListChange(limit) {
      this.limit = limit - 1;
      this.queryOrgList();
    },
    addOrg() {
      this.groupInfo = {}
      this.dialogFormVisible = true
    },
    updateOrInsertOrg() {
      this.dialogFormVisible = false
      this.limit = 0;
      this.$refs.table.offset = CONST.PAGE_SIZE;
      this.queryOrgList();
    },
    handleTable(scope, type) {
      console.log(scope)
      if (type == "delete") {
        this.$confirm("您确定要删除吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$http.deleteStreet({streetId: scope.medicalStreetId}).then(res => {
              if(res && res.result && res.result.success) {
                this.$message.success("删除成功!")
                this.queryOrgList()
              }
            })
          })
          .catch(() => {})
      } else {
        this.groupInfo = scope;
        this.dialogFormVisible = true;
      }
    },
  },
};
</script>
<style lang='less' scoped>
</style>
