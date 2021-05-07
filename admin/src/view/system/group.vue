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
        <el-button @click="dialogFormVisible = true">添加机构</el-button>
      </el-form-item>
    </el-form>
    <Table
      ref="table"
      :orgList="orgList"
      @handleTable="handleTable"
      @handleListChange="handleListChange"
    />
    <groupDialog
      :dialogFormVisible="dialogFormVisible"
      :info="groupInfo"
      @handleClose="dialogFormVisible = false"
    />
  </div>
</template>
<script>
import CONST from "@/data/const";
import Table from "./components/groupTable";
import groupDialog from "./components/groupDialog";
import { mapState } from "vuex";
export default {
  components: {
    Table,
    groupDialog,
  },
  data() {
    return {
      dialogFormVisible: false,
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
    queryOrgList() {
      let param = {
        loginAccount: this.user.loginAccount,
        limit: this.limit,
        offset:  this.$refs.table.offset,
        ...this.form,
      };
      let res = this.$http.queryOrgList(param);
      if (res && res.orgList) {
        this.orgList = res.orgList;
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
    handleTable(scope, type) {
      if (type == "delete") {
        this.$confirm("您确定要删除吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          })
          .catch(() => {});
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
