<template>
  <div>
    <el-table :data="info" stripe border style="width: 100%">
      <el-table-column type="index" label="序号" width="70"> </el-table-column>
      <el-table-column prop="newsTitle" label="标题名称"> </el-table-column>
      <el-table-column prop="newsLink" label="链接地址" width="180">
      </el-table-column>
      <el-table-column prop="image" label="缩略图">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="previewImage(scope.row)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="newsStatus"
        :formatter="formatter"
        label="发布状态"
      >
      </el-table-column>
      <el-table-column
        prop="publishTime"
        :formatter="formatter"
        label="发布时间"
      >
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleTable(scope.row, 'publish')"
            >{{ scope.row.newsStatus == 0 ? "显示" : "隐藏" }}</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="handleTable(scope.row, 'top')"
            >置顶</el-button
          >
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
export default {
  name: "Table",
  props: {
    info: Array,
    total: Number
  },
  data() {
    return {
      currentPage: 1,
      pageSizeList: CONST.PAGE_SIZE_LIST,
      offset: CONST.PAGE_SIZE,
    };
  },
  methods: {
    formatter(row, col) {
      if (col.label == "发布状态") {
        return row.newsStatus == 0 ? "隐藏" : "显示";
      } else if (col.label == "发布时间") {
        return dateFormat("YYYY-mm-dd HH:MM", row.publishTime);
      }
    },
    handleListChange() {
      this.$emit("handleListChange", this.currentPage);
    },
    previewImage(v) {
      this.$Preview({src: v.newsPic})
    },
    handleTable(scope, type) {
      switch (type) {
        case "publish": {
          let param = {
            medicalNewsId: scope.medicalNewsId,
            newsEnable: scope.newsStatus == "1" ? 0 : 1,
          };
          this.$http.newsEnable(param).then((res) => {
            if (res && res.result && res.result.success) {
              scope.newsStatus = scope.newsStatus == "1" ? 0 : 1;
            }
          });
          break;
        }
        case "top":
          this.$http
            .newsTop({ medicalNewsId: scope.medicalNewsId })
            .then((res) => {
              if (res && res.result && res.result.success) {
                this.$message.success("置顶成功");
              }
            });
          break;
        case "edit":{
          let path = scope.newsType == 1 ? `/content/banner/add/${scope.medicalNewsId}` : `/content/news/add/${scope.medicalNewsId}`
          this.$router.push({path: path})
          break;
        }
        case "delete": {
          this.$confirm("您确定要删除吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
          })
            .then(() => {
              this.$http
                .deleteNews({ medicalNewsId: scope.medicalNewsId })
                .then((res) => {
                  if (res && res.result && res.result.success) {
                    this.$message.success("删除成功");
                  }
                });
            })
            .catch(() => {});
          break;
        }
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
