<template>
  <div>
    <el-table :data="verifyList" stripe border style="width: 100%">
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="applyName" label="申请人"> </el-table-column>
      <el-table-column prop="reimbursePeople" label="报销人"> </el-table-column>
      <el-table-column prop="reimburseCardNo" label="报销人身份证号">
      </el-table-column>
      <el-table-column prop="reimburseType" :formatter="formatterType" label="报销类型"> </el-table-column>
      <el-table-column
        prop="createTime"
        :formatter="formatter"
        label="申请日期"
      >
      </el-table-column>
      <el-table-column prop="personStreet" label="审核机构"> </el-table-column>
      <!-- <template v-if="typs == '1'"> -->
        <el-table-column prop="verifyStatus" :formatter="state1" label="审核状态">
        </el-table-column>
        <el-table-column prop="verifyStatus" :formatter="state2" label="审核结果">
        </el-table-column>
      <!-- </template> -->
      <el-table-column prop="updateTime" :formatter="formatter" label="审核日期" > </el-table-column>
      <!-- 缺失 -->

      <el-table-column
        label="操作"
        width="50"
        
      >
      <!-- v-if="user.accountRole != '1' || (user.accountRole == '1' &&typs != '0')" -->
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleAudit(scope.row)">{{
            typs == "0" ? "审核" : "查看"
          }}</el-button>
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
import { mapState } from "vuex";
import CONST from "@/data/const";
import { dateFormat } from "@/utils/tool";
import { findIndex } from "loadsh"
export default {
  name: "Table",
  props: {
    verifyList: Array,
    total: Number,
    typs: String,
  },
  data() {
    return {
      currentPage: 1,
      pageSizeList: CONST.PAGE_SIZE_LIST,
      offset: CONST.PAGE_SIZE,
      tableData: [{}, {}],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    handleAudit(row) {
      this.$router.push({
        path: "/audit/index/detail/" + row.medicalReimburseId,
      });
    },
    handleListChange() {
      this.$emit("handleListChange", this.currentPage);
    },
    formatter(row) {
      return dateFormat("YYYY-mm-dd HH:MM", row.createTime);
    },
    formatterType(row) {
        let index = findIndex(CONST.PAY_TYPE, ['value', row.reimburseType])
        return CONST.PAY_TYPE[index] && CONST.PAY_TYPE[index].name
    },
    state1(row){
      return row.verifyStatus == '0'?'未审核':'已审核'
    },
    state2(row){
      return (row.verifyStatus == '1'||row.verifyStatus == '3')?'审核成功':((row.verifyStatus == '2'||row.verifyStatus == '4')?'审核失败':'')
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
