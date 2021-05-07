<template>
  <div>
    <el-table :data="orgList" stripe border style="width: 100%">
      <el-table-column prop="index" label="序号" width="180"> </el-table-column>
      <el-table-column prop="name" label="机构名称" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column prop="phone" label="联系电话"> </el-table-column>
      <el-table-column prop="date" label="创建时间"> </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleTable(scope, 'edit')"
            >修改</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="handleTable(scope, 'delete')"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="currentPage"
      :page-sizes="pageSizeList"
      :page-size.sync="offset"
      layout="total, sizes, prev, pager, next, jumper"
      :total="orgList.length"
      @size-change="handleListChange"
      @current-change="handleListChange"
    >
    </el-pagination>
  </div>
</template>
<script>
import CONST from "@/data/const";
export default {
  name: "Table",
  props: {
    orgList: Array,
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
