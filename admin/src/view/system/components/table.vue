<template>
  <div>
    <el-table :data="accountList" stripe border style="width: 100%">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="loginAccount" label="登录账号"> </el-table-column>
      <el-table-column prop="accountName" label="姓名"> </el-table-column>
      <el-table-column prop="orgName" label="所属机构"> </el-table-column>
      <el-table-column
        prop="accountRole"
        :formatter="formatter"
        label="用户角色"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        :formatter="formatter"
        label="创建时间"
      >
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleTable(scope.row, 'edit')"
            >修改</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="handleTable(scope.row, 'reset')"
            >重置密码</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="handleTable(scope.row, 'delete')"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page.sync="currentPage"
      :page-sizes="pageSizeList"
      :page-size.sync="offset"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleListChange"
      @current-change="handleListChange"
    >
    </el-pagination>
  </div>
</template>
<script>
import CONST from "@/data/const";
import { findIndex } from "loadsh"
import { dateFormat } from "@/utils/tool";
export default {
  name: "Table",
  props: {
    accountList: Array,
    total: Number,
  },
  data() {
    return {
      currentPage: 1,
      pageSizeList: CONST.PAGE_SIZE_LIST,
      offset: CONST.PAGE_SIZE,
    };
  },
  methods: {
    handleTable(scope, type) {
      this.$emit("handleTable", scope, type);
    },
    handleListChange() {
      this.$emit("handleListChange", this.currentPage);
    },
    formatter(row, col) {
      if (col.property == "createTime") {
        return dateFormat("YYYY-mm-dd HH:MM", row.createTime);
      } else {
        let index = findIndex(CONST.ROLE_LIST, ['value', row.accountRole])
        return CONST.ROLE_LIST[index] && CONST.ROLE_LIST[index].name || ''
      }
    },
  },
};
</script>
<style lang='less' scoped>
.el-pagination {
  margin-top: 30px;
  text-align: right;
}
</style>
