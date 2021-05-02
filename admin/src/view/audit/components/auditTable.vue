<template>
    <div>
        <el-table :data="tableData" stripe border style="width: 100%">
            <el-table-column prop="index" label="序号" width="180">
            </el-table-column>
            <el-table-column prop="name" label="申请人" width="180">
            </el-table-column>
            <el-table-column prop="payName" label="报销人"> </el-table-column>
            <el-table-column prop="IDcard" label="报销人身份证号">
            </el-table-column>
            <el-table-column prop="type" label="报销类型"> </el-table-column>
            <el-table-column prop="date" label="申请日期"> </el-table-column>
            <el-table-column prop="group" label="审核机构"> </el-table-column>
            <el-table-column prop="state" label="审核状态"> </el-table-column>
            <el-table-column prop="result" label="审核结果"> </el-table-column>
            <el-table-column prop="time" label="审核日期"> </el-table-column>
            <el-table-column label="操作" width="50">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="small"
                        @click="handleAudit(scope)"
                        >审核</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            :current-page="currentPage"
            :page-sizes="pageSizeList"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="0"
        >
        </el-pagination>
    </div>
</template>
<script>
    import CONST from "@/data/const";
    export default {
        name: "Table",
        data() {
            return {
                currentPage: 1,
                pageSizeList: CONST.PAGE_SIZE_LIST,
                pageSize: CONST.PAGE_SIZE,
                tableData: [{}, {}],
            };
        },
        methods: {
            handleAudit() {
              this.$router.push({path: '/audit/index/detail'})
            },
        },
    };
</script>
<style lang='less' scoped>
.el-pagination{
  margin-top: 30px;
  text-align: right;
}
</style>
