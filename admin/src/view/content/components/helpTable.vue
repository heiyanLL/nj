<template>
  <div>
    <el-table :data="info" stripe border style="width: 100%">
      <el-table-column type="index" label="序号" width="70"> </el-table-column>
      <el-table-column prop="normalQuestion" label="常见问题">
      </el-table-column>
      <el-table-column prop="answerQuestion" label="问题解答">
      </el-table-column>
      <el-table-column
        prop="publishTime"
        :formatter="formatter"
        label="发布时间"
      >
      </el-table-column>
      <el-table-column label="操作" width="150" v-if="user.accountRole == '1'">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="
              $router.push({
                path: '/content/help/add/' + scope.row.medicalHelpId
              })
            "
            >修改</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="handleTable(scope.row)"
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
import { mapState } from "vuex";
import { dateFormat } from "@/utils/tool";
export default {
  name: "Table",
  props: {
    info: Array,
    total: Number
  },
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      currentPage: 1,
      pageSizeList: CONST.PAGE_SIZE_LIST,
      offset: CONST.PAGE_SIZE,
    };
  },
  methods: {
    handleTable(scope) {
      this.$emit("handleTable", scope);
    },
    formatter(row) {
      return dateFormat("YYYY-mm-dd HH:MM", row.publishTime);
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
