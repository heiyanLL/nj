<template>
    <div>
        <el-dialog
            width="500px"
            :title="title"
            :visible.sync="dialogFormVisible"
            @close="handleClose"
        >
            <el-form :model="form" label-width="80px" size="small">
                <el-form-item label="登录账号">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属机构">
                    <el-select
                        v-model="form.region"
                        placeholder="请选择所属机构"
                    >
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户角色">
                    <el-radio-group v-model="form.role">
                        <el-radio
                            v-for="item in roleList"
                            :key="item.name"
                            :label="item.value"
                            >{{ item.name }}</el-radio
                        >
                    </el-radio-group>
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
    import CONST from "@/data/const";
    export default {
        name: "dialog",
        props: {
            dialogFormVisible: Boolean,
            info: Object
        },
        data() {
            return {
                roleList: CONST.ROLE_LIST,
                form: {
                    role: "",
                },
            };
        },
        computed: {
          title() {
            return this.info ? '修改账号' : '添加账号'
          }
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