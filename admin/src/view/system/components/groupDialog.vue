<template>
    <div>
        <el-dialog
            width="500px"
            :title="title"
            :visible.sync="dialogFormVisible"
            @close="handleClose"
        >
            <el-form :model="form" label-width="80px" size="small">
                <el-form-item label="机构名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="所属街道">
                    <el-select
                        v-model="form.region"
                        placeholder="请选择所属机构"
                    >
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: "groupDialog",
        props: {
            dialogFormVisible: Boolean,
            info: Object,
        },
        data() {
            return {
                form: {},
            };
        },
        computed: {
            title() {
                return this.info ? "机构修改" : "添加机构";
            },
        },
        methods: {
            handleClose() {
                this.$emit("handleClose");
            },
        },
    };
</script>
<style lang='less' scoped>
</style>