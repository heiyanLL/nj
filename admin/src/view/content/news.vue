<template>
  <div>
    <el-form :inline="true" size="small" :model="form">
      <el-form-item label="状态">
        <el-select
          v-model="form.publishStatus"
          :clearable="true"
          placeholder="请选择发布状态"
        >
          <el-option
            v-for="item in stateList"
            :key="item.name"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关键词">
        <el-input
          v-model="form.param"
          placeholder="查询标题名称等关键词"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button type="info" @click="handleQuery($event, 'reset')"
          >重置</el-button
        >
        <el-button @click="handleUpdateNews"
          >添加{{ newsType == "0" ? "资讯" : "banner" }}</el-button
        >
      </el-form-item>
    </el-form>
    <Table
      :info="newsList"
      :total="total"
      ref="table"
      @handleListChange="handleListChange"
    />
  </div>
</template>
<script>
import CONST from "@/data/const";
import Table from "./components/table";
export default {
  components: {
    Table,
  },
  data() {
    return {
      stateList: CONST.PUBLISH_STATE,
      newsType: this.$route.name == "news" ? 0 : 1,
      newsList: [],
      form: {
        publishStatus: "",
        param: "",
      },
      limit: 1,
      total: 0,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      (vm.newsType = vm.$route.name == "news" ? 0 : 1), vm.describeNewsList();
    });
  },
  mounted() {},
  methods: {
    async describeNewsList() {
      let param = {
        newsType: this.newsType,
        limit: this.limit,
        newsNum: this.$refs.table.offset,
        ...this.form,
      };
      let res = await this.$http.describeNewsList(param);
      if (res && res.newsList) {
        this.newsList = res.newsList;
        this.total = res.size
      }
    },
    handleListChange(limit) {
      this.limit = limit;
      this.describeNewsList();
    },
    initParam() {
      this.limit = 1;
      this.form = {
        publishStatus: "",
        param: "",
      };
      this.$refs.table.offset = CONST.PAGE_SIZE;
    },
    handleQuery(e, reset) {
      if (reset) this.initParam();
      this.describeNewsList();
    },
    handleUpdateNews() {
      this.newsType == "0"
        ? this.$router.push({ path: "/content/news/add" })
        : this.$router.push({ path: "/content/banner/add" });
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
