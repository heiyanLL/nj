<template>
  <div>
    <el-dialog
      width="500px"
      :title="title"
      :visible.sync="dialogFormVisible"
      @close="handleClose"
    >
      <el-form :model="form" label-width="80px" size="small">
        <el-form-item label="街道名称">
          <el-input v-model="form.streetName"></el-input>
        </el-form-item>
        <el-form-item label="街道电话">
          <el-input v-model="form.streetPhone"></el-input>
        </el-form-item>
        <el-form-item label="街道地址">
          <el-input v-model="form.streetAddress"></el-input>
        </el-form-item>
        <el-form-item label="所属街道">
          <el-input v-model="form.street"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark"></el-input>
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
        streetName: '',
        streetPhone: '',
        streetAddress: '',
        street: '',
        remark: ''
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
      return this.info.medicalStreetId ? "街道修改" : "添加街道";
    }
  },
  mounted() {
    this.form.streetName = this.info.streetName
  },
  methods: {
    handleClose() {
      this.$emit("handleClose");
    },
    async updateOrInsertOrg() {
      let param = {
        medicalStreetId: this.form.medicalStreetId || "",
        streetName: this.form.streetName,
        streetPhone: this.form.streetPhone,
        streetAddress: this.form.streetAddress,
        street: this.form.street,
        remark: this.form.remark
      };
      let res = await this.$http.updateOrInsertStreet(param)
      if(res && res.result && res.result.success) {
        this.$emit("updateOrInsertOrg");
      }
    },
  },
};
</script>
<style lang='less' scoped>
</style>