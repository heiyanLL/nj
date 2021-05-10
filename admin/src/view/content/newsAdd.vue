<template>
  <div>
    <el-form label-width="80px" :model="form">
      <el-form-item label="链接地址" prop="newsLink">
        <el-input v-model="form.newsLink"></el-input>
      </el-form-item>
      <el-form-item label="标题名称" prop="newsTitle">
        <el-input v-model="form.newsTitle"></el-input>
      </el-form-item>
      <el-form-item>
        <TinymceEditor @input="debounce"></TinymceEditor>
      </el-form-item>
      <el-form-item label="缩略图" prop="image">
        <el-upload
          class="upload-demo"
          action="/medical/help/uploadPictures"
          :file-list="form.newsPic"
          list-type="picture"
          limit="1"
          name="files"
          accept="image/jpg, image/jpeg, image/png"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { _debounce } from "@/utils/tool";
import TinymceEditor from "@/components/tEditor";
export default {
  components: {
    TinymceEditor,
  },
  data() {
    return {
      form: {
        medicalNewsId: "",
        newsType: this.$route.name == "newsAdd" ? "0" : "1",
        newsTitle: "",
        newsLink: "",
        newsText: "",
        newsPic: [],
      },
      debounce: _debounce(this.editorInput),
    };
  },
  methods: {
    async updateOrInsertNews() {
      let res = await this.$http.updateOrInsertNews(this.form);
      console.log(res)
    },
    editorInput(v) {
      this.form.newsText = v;
    },
    onSubmit() {
        this.updateOrInsertNews()
    }
  },
};
</script>
<style lang='less' scoped>
</style>
