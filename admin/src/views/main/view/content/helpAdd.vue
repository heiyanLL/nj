<template>
    <div>
        <el-form label-width="80px" :model="form">
            <el-form-item label="常见问题" prop="quesiton">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="问题解答" prop="answer">
                <el-input
                    :rows="10"
                    type="textarea"
                    v-model="form.name"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">发布</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                form: {},
            };
        },
    };
</script>
<style lang='less' scoped>
    .el-form {
        width: 500px;
    }
</style>
