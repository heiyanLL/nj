<template>
    <div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="待审核" name="auditing"></el-tab-pane>
            <el-tab-pane label="已审核" name="audited"></el-tab-pane>
        </el-tabs>
        <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="报销类型">
                <el-select v-model="form.type" placeholder="请选择报销类型">
                    <el-option v-for="item in typeList" :key="item.name" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="审核机构">
                <el-select v-model="form.group" placeholder="请选择审核机构">
                    <el-option v-for="item in typeList" :key="item.name" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="审核结果" v-if="activeName == 'audited'">
                <el-select v-model="form.group" placeholder="请选择审核结果">
                    <el-option v-for="item in resultList" :key="item.name" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关键词">

            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
    </div>
</template>
<script>  
    import CONST from '~/data/const'
    export default {
        data() {
            return {
                activeName: "auditing",
                typeList: CONST.PAY_TYPE,
                resultList: CONST.AUDIT_RESULT,
                tableData: [],
                form: {
                  type: '',
                  group: '',
                  result: '',
                  keywords: ''
                },
            };
        },
        methods: {
            handleClick() {},
        },
    };
</script>
<style lang='less' scoped>
.el-form{
  text-align: left;
}
</style>
