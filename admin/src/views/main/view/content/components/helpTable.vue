<template>
    <div>
        <el-table :data="tableData" stripe border style="width: 100%">
            <el-table-column prop="index" label="序号" width="70">
            </el-table-column>
            <el-table-column prop="question" label="常见问题">
            </el-table-column>
            <el-table-column prop="answer" label="问题解答">
            </el-table-column>
            <el-table-column prop="date" label="发布时间"> </el-table-column>
            <el-table-column label="操作" width="150">
                <template>
                    <el-button
                        type="text"
                        size="small"
                        >修改</el-button
                    >
                    <el-button
                        type="text"
                        size="small"
                        >删除</el-button
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
    import CONST from "~/data/const";
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

        },
    };
</script>
<style lang='less' scoped>
.el-pagination{
  margin-top: 30px;
  text-align: right;
}
</style>
