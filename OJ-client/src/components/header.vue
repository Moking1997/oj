<!--  -->
<template>
  <div class="header">
    <el-row>
      <el-col :span="20">宁波大学科学技术学院OJ系统 - 题目管理系统</el-col>
      <el-col :span="4">
        <el-button v-if="limit" v-show="!admin" @click="intoAdmin">进入后台</el-button>
        <el-button v-if="limit" v-show="admin" @click="intoHome">进入前台</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      limit: false,
      admin: false
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  methods: {
    intoAdmin() {
      this.$router.push({ path: "/admin" });
      this.admin = true;
    },
    intoHome() {
      this.$router.push({ path: "/index" });
      this.admin = false;
    }
  },
  created() {
    if (window.sessionStorage.getItem("limit") == 1) this.limit = true;
    if (this.$route.path.slice(1, 6) == "admin") {
      this.admin = true;
    }
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.header {
  background: #409eff;
  font-size: 18px;
  line-height: 60px;
}
</style>