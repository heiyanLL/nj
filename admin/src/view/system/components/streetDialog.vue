<template>
  <div>
    <el-dialog
      width="500px"
      :title="title"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      @close="handleClose"
    >
      <el-form
        :model="form"
        label-width="80px"
        size="small"
        ref="forms"
        :rules="rules"
      >
        <el-form-item label="街道名称" prop="streetName">
          <el-input
            v-model="form.streetName"
            placeholder="请输入街道名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="街道电话">
          <el-input
            v-model="form.streetPhone"
            placeholder="请输入街道办事处电话"
          ></el-input>
        </el-form-item>
        <el-form-item label="街道地址">
          <el-input
            v-model="form.streetAddress"
            placeholder="请输入街道办事处地址"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitForm">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import { cloneDeep } from "@/utils/tool";
export default {
  name: "groupDialog",
  props: {
    dialogFormVisible: Boolean,
    info: Object,
  },
  data() {
    return {
      form: {
        streetName: "",
        streetPhone: "",
        streetAddress: "",
      },
      rules: {
        streetName: [
          { required: true, message: "请输入街道名称", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    info: {
      handler(v) {
        this.form = { ...v };
      },
      deep: true,
    },
  },
  computed: {
    title() {
      return this.info.medicalStreetId ? "街道修改" : "添加街道";
    },
  },
  mounted() {
    this.form.streetName = this.info.streetName;
  },
  methods: {
    handleClose() {
      this.$emit("handleClose");
    },
    submitForm() {
      this.$refs["forms"].validate((valid) => {
        if (valid) {
          this.updateOrInsertOrg();
        } else {
          return false;
        }
      });
    },
    async updateOrInsertOrg() {
      let param = {
        medicalStreetId: this.form.medicalStreetId || "",
        streetName: this.form.streetName,
        streetPhone: this.form.streetPhone,
        streetAddress: this.form.streetAddress,
        street: this.form.street,
        remark: this.form.remark,
      };
      let res = await this.$http.updateOrInsertStreet(param);
      if (res && res.result && res.result.success) {
        this.$emit("updateOrInsertOrg");
      }
    },
  },
};
</script>
<style lang='less' scoped>
</style>