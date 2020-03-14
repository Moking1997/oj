<template>
  <div id="login">
    <div class="loginToHome">
      <h3>登陆</h3>
      <el-form
        ref="form"
        :model="form"
        :rules="ruleForm"
        status-icon
        label-width="80px"
        class="loginForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input type="text" v-model="form.name" auto-complete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="homeBut" type="primary" plain @click="submit" :loading="logining">登录</el-button>
          <el-button class="loginBut" type="primary" plain @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      logining: false,
      form: {
        name: "",
        password: ""
      },
      ruleForm: {
        name: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submit(event) {
      this.$refs.form.validate(async valid => {
        if (valid) {
          let _self = this;
          let url = "login";
          let { data: res } = await _self.$http.post(url, this.form);
          if (res.state == 0) {
            this.logining = true;
            sessionStorage.setItem("id", res.id);
            sessionStorage.setItem("name", res.name);
            sessionStorage.setItem("token", res.token);
            sessionStorage.setItem("limit", res.limit);
            this.$router.push({ path: "/home" });
            this.$message.success("登入成功");
          } else if (res.state == 1) {
            this.$message.error("该用户不存在");
          } else if (res.state == 2) {
            this.$message.error("密码错误");
          }
        } else {
          return false;
        }
      });
    },
    async resetForm() {
      this.form.name = "";
      this.form.pass = "";
    }
  },
  created() {
    // if(this.$router)
    console.log(this.$route.path);
  }
};
</script>
<style scoped>
.loginToHome {
  text-align: center;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  margin: auto;
  width: 400px;
  height: 300px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  background: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 2px 2px 5px #888888;
}
.loginToHome h3 {
  margin: 30px auto 20px auto;
}
.loginForm {
  margin: 0 30px 0 10px;
  width: 360px;
  text-align: center;
  padding-top: 15px;
  top: 10px;
}
.homeBut {
  position: absolute;
  left: 0px;
}
.loginBut {
  position: absolute;
  right: 0px;
}
</style>