<template>
    <div>
        <el-form label-width="80px" :model="form">
            <el-form-item label="标题名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="链接地址" prop="url">
                <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="问题解答" prop="answer">
                <el-input
                    :rows="10"
                    type="textarea"
                    v-model="form.name"
                ></el-input>
            </el-form-item>
            <el-form-item label="缩略图" prop="image">
                <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :file-list="form.fileList"
                >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">
                        只能上传jpg/png文件，且不超过500kb
                    </div>
                </el-upload>
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
                form: {
                  fileList: []
                },
            };
        },
    };
</script>
<style lang='less' scoped>
</style>
