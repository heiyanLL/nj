<template>
  <div>
    <el-table :data="orgList" stripe border style="width: 100%">
      <el-table-column type="index" label="序号" width="80"> </el-table-column>
      <el-table-column prop="streetName" label="街道名称">
      </el-table-column>
      <!-- <el-table-column prop="streetPhone" label="街道电话"> </el-table-column> -->
      <el-table-column prop="streetAddress" label="街道地址"> </el-table-column>
      <!-- <el-table-column prop="street" label="所属街道"> </el-table-column> -->
      <el-table-column prop="remark" label="备注"> </el-table-column>
      <el-table-column prop="createTime" :formatter="formatter" label="创建时间"> </el-table-column>
      <el-table-column label="操作" width="150" v-if="user.accountRole == '1'">
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
import { dateFormat } from "@/utils/tool";
import { mapState } from "vuex";
export default {
  name: "Table",
  props: {
    orgList: Array,
    total: Number
  },
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      currentPage: 1,
      pageSizeList: CONST.PAGE_SIZE_LIST,
      offset: CONST.PAGE_SIZE
    };
  },
  methods: {
    handleTable(scope, type) {
      this.$emit("handleTable", scope, type);
    },
    handleListChange() {
      this.$emit("handleListChange", this.currentPage);
    },
    formatter(row) {
      return dateFormat("YYYY-mm-dd HH:MM", row.createTime);
    }
  },
};
</script>
<style lang='less' scoped>
.el-pagination {
  margin-top: 30px;
  text-align: right;
}
</style>
