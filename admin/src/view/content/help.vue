<template>
  <div>
    <el-form :inline="true" size="small" :model="form">
      <el-form-item label="报销类型">
        <el-select
          v-model="form.reimburseType"
          :clearable="true"
          placeholder="请选择报销类型"
        >
          <el-option
            v-for="item in typeList"
            :key="item.name"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关键词">
        <el-input
          v-model="form.param"
          placeholder="查询常见问题名称关键词"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button type="info">重置</el-button>
        <el-button v-if="user.accountRole == '1'" @click="$router.push({ path: '/content/help/add' })"
          >添加帮助</el-button
        >
      </el-form-item>
    </el-form>
    <Table
      ref="table"
      :info="helpList"
      :total="total"
      @handleTable="handleTable"
      @handleListChange="handleListChange"
    />
  </div>
</template>
<script>
import CONST from "@/data/const";
import Table from "./components/helpTable";
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
      typeList: CONST.PAY_TYPE,
      form: {
        reimburseType: "",
        param: "",
      },
      limit: 1,
      total: 0,
      helpList: [],
    };
  },
  mounted() {
    this.queryHelpList();
  },
  methods: {
    async queryHelpList() {
      let param = {
        limit: this.limit,
        offset: this.$refs.table.offset,
        ...this.form,
      };
      let res = await this.$http.queryHelpList(param);
      if (res && res.helpList) {
        this.helpList = res.helpList;
        this.total = res.size;
      }
    },
    handleTable(scope) {
      this.$confirm("您确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          this.$http
            .deleteHelp({ medicalHelpId: scope.medicalHelpId })
            .then((res) => {
              if (res && res.result && res.result.success) {
                this.$message.success("删除成功!");
                this.queryHelpList();
              }
            });
        })
        .catch(() => {});
    },
    handleListChange(limit) {
      this.limit = limit;
      this.queryHelpList();
    },
  },
};
</script>
<style lang='less' scoped>
</style>
