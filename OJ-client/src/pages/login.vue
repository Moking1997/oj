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
        <el-form-item v-if="identifyVisual" label="验证码" prop="code">
          <el-input type="text" v-model="form.code" placeholder="请输入验证码">
            <template slot="append" class="login-code">
              <div @click="refreshCode">
                <Identify :identifyCode="identifyCode"></Identify>
              </div>
            </template>
          </el-input>
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
import Identify from "@/components/identify";

export default {
  components: {
    Identify
  },
  data() {
    return {
      loginError: 0,
      logining: false,
      form: {
        name: "",
        password: "",
        code: ""
      },
      identifyCodes: "1234567890abcdefjhijklinopqrsduvwxyz",
      identifyCode: "",
      identifyVisual: false,
      ruleForm: {
        name: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },

  methods: {
    submit(event) {
      if (this.identifyVisual) {
        if (this.form.code.toLowerCase() !== this.identifyCode.toLowerCase()) {
          this.$message.error("请填写正确验证码");
          this.refreshCode();
          return;
        }
      }

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
            this.loginChecking();
          } else if (res.state == 2) {
            this.$message.error("密码错误");
            this.loginChecking();
          }
        } else {
          return false;
        }
      });
    },
    async resetForm() {
      this.form.name = "";
      this.form.password = "";
    },
    loginChecking() {
      this.loginError = this.loginError + 1;
      this.refreshCode();
      if (this.loginError >= 3) {
        this.identifyVisual = true;
      }
    },
    // 重置验证码
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
  },
  created() {},
  mounted() {
    // 初始化验证码
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  }
};
</script>
<style >
.el-input-group__append {
  padding: 0 !important;
}
</style>
<style scoped>
.loginToHome {
  text-align: center;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  margin: auto;
  width: 400px;
  height: 350px;
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
.el-input-group__append {
  padding: 0 !important;
}
</style>