<template>
    <div>
        <el-table :data="verifyList" stripe border style="width: 100%">
            <el-table-column type="index" label="序号" width="180">
            </el-table-column>
            <el-table-column prop="applyName" label="申请人" width="180">
            </el-table-column>
            <el-table-column prop="reimbursePeople" label="报销人"> </el-table-column>
            <el-table-column prop="reimburseCardNo" label="报销人身份证号">
            </el-table-column>
            <el-table-column prop="reimburseType" label="报销类型"> </el-table-column>
            <el-table-column prop="createTime" label="申请日期"> </el-table-column>
            <el-table-column prop="personStreet" label="审核机构"> </el-table-column>
            <template v-if="typs=='1'">    
                <el-table-column prop="verifyStatus" label="审核状态"> </el-table-column>
                <el-table-column prop="verifyStatus" label="审核结果"> </el-table-column>
            </template>
            <el-table-column prop="time" label="审核日期"> </el-table-column>  <!-- 缺失 -->
            <el-table-column label="操作" width="50">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="small"
                        @click="handleAudit(scope.row)"
                        >{{typs=='0'?'审核':'查看'}}</el-button
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
    export default {
        name: "Table",
        props: {
            verifyList: Array,
            total: Number,
            typs:String
        },
        data() {
            return {
                currentPage: 1,
                pageSizeList: CONST.PAGE_SIZE_LIST,
                offset: CONST.PAGE_SIZE,
                tableData: [{}, {}],
            };
        },
        methods: {
            handleAudit(row) {
                this.$router.push({path: '/audit/index/detail/'+row.medicalReimburseId})
            },
            handleListChange() {
                this.$emit("handleListChange", this.currentPage);
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
