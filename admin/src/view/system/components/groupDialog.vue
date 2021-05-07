<template>
  <div>
    <el-dialog
      width="500px"
      :title="title"
      :visible.sync="dialogFormVisible"
      @close="handleClose"
    >
      <el-form :model="info" label-width="80px" size="small">
        <el-form-item label="机构名称">
          <el-input v-model="info.orgName"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="info.orgAddress"></el-input>
        </el-form-item>
        <el-form-item label="所属街道">
          <el-input v-model="info.orgStreet"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="info.orgPhone"></el-input>
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
      return this.info.medicalOrganizationId ? "机构修改" : "添加机构";
    },
  },
  methods: {
    handleClose() {
      this.$emit("handleClose");
    },
    updateOrInsertOrg() {
      let param = {
        medicalOrganizationId: this.info.medicalOrganizationId || "",
        orgName: this.info.orgName,
        orgPhone: this.info.orgPhone,
        orgAddress: this.info.orgAddress,
        orgStreet: this.info.orgStreet,
      };
      let res = this.$http.updateOrInsertOrg(param);
      console.log(res);
    },
  },
};
</script>
<style lang='less' scoped>
</style>