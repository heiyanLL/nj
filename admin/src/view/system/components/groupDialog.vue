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
        <el-form-item label="机构名称" prop="orgName">
          <el-input
            v-model="form.orgName"
            placeholder="请输入机构名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input
            v-model="form.orgAddress"
            placeholder="请输入机构地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input
            v-model="form.orgPhone"
            placeholder="请输入机构电话"
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
export default {
  name: "groupDialog",
  props: {
    dialogFormVisible: Boolean,
    info: Object,
  },
  data() {
    return {
      form: {
        orgName: "",
        orgAddress: "",
        street: "",
        orgPhone: "",
      },
      rules: {
        orgName: [
          { required: true, message: "请输入机构名称", trigger: "blur" }
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
      return this.info.medicalOrganizationId ? "机构修改" : "添加机构";
    },
  },
  mounted() {
    this.form.orgName = this.info.orgName;
  },
  methods: {
    handleClose() {
      this.$emit("handleClose");
    },
    submitForm() {
      this.$refs['forms'].validate((valid) => {
        if (valid) {
          this.updateOrInsertOrg()
        } else {
          return false;
        }
      });
    },
    async updateOrInsertOrg() {
      let param = {
        medicalOrganizationId: this.form.medicalOrganizationId || "",
        orgName: this.form.orgName,
        orgPhone: this.form.orgPhone,
        orgAddress: this.form.orgAddress,
        street: this.form.street,
      };
      let res = await this.$http.updateOrInsertOrg(param);
      if (res && res.result && res.result.success) {
        this.$emit("updateOrInsertOrg");
      }
    },
  },
};
</script>
<style lang='less' scoped>
</style>