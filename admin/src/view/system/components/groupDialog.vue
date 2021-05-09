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
          <el-input v-model="form.orgName"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.orgAddress"></el-input>
        </el-form-item>
        <el-form-item label="所属街道">
          <el-input v-model="form.orgStreet"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.orgPhone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="updateOrInsertOrg">保 存</el-button>
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
        orgName: '',
        orgAddress: '',
        orgStreet: '',
        orgPhone: '',
      },
    };
  },
  watch: {
    info: {
      handler(v) {
        this.form = { ...v }
      },
      deep: true
    }
  },
  computed: {
    title() {
      return this.info.medicalOrganizationId ? "机构修改" : "添加机构";
    }
  },
  mounted() {
    this.form.orgName = this.info.orgName
  },
  methods: {
    handleClose() {
      this.$emit("handleClose");
    },
    async updateOrInsertOrg() {
      let param = {
        medicalOrganizationId: this.form.medicalOrganizationId || "",
        orgName: this.form.orgName,
        orgPhone: this.form.orgPhone,
        orgAddress: this.form.orgAddress,
        orgStreet: this.form.orgStreet,
      };
      let res = await this.$http.updateOrInsertOrg(param)
      if(res && res.result && res.result.success) {
        this.$emit("updateOrInsertOrg");
      }
    },
  },
};
</script>
<style lang='less' scoped>
</style>