<!--  -->
<template>
  <div>
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>

    <el-page-header @back="$router.go(-1)" content="个人信息设置"></el-page-header>
    <div class="setting">
      <el-form :model="ruleForm">
        <el-form-item label="用户ID" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="ruleForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户权限" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="ruleForm.limits" autocomplete="off"></el-input>
        </el-form-item>
        <el-button type="success" @click="editPassword()">修改密码</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      formLabelWidth: "120px",
      dialogFormVisible: false,
      ruleForm: {
        id: "",
        name: "",
        limits: "",
        password: "",
        checkPass: ""
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    getForm() {
      this.ruleForm.id = window.sessionStorage.id;
      this.ruleForm.name = window.sessionStorage.name;
      if (window.sessionStorage.limit == 1) {
        this.ruleForm.limits = "管理员";
      } else {
        this.ruleForm.limits = "普通用户";
      }
    },
    editPassword() {
      this.dialogFormVisible = true;
      this.ruleForm.password = "";
      this.ruleForm.checkPass = "";
    },
    async editUser() {
      let { data: res } = await this.$http.post("users/edit", this.ruleForm);
      if (res.state == 0) {
        // this.getUser();
        this.$message.success("修改成功");
        this.dialogFormVisible = false;
      } else if (res.state == 1) {
        this.$message.error("修改失败,该用户不存在");
      } else if (res.state == 2) {
        this.$message.error("修改失败,该用户名已存在");
      }
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getForm();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.setting {
  width: 400px;
  margin: 20px auto;
  text-align: center;
}
</style>