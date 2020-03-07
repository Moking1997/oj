<!--  -->
<template>
  <el-main>
    <el-page-header @back="$router.go(-1)" content="新增题目"></el-page-header>
    <br />
    <form ref="form1" method="post" enctype="multipart/form-data">
      标题:
      <el-input v-model="problem.title" name="title"></el-input>是否设置陷阱
      <br />
      <br />分类:
      <el-input v-model="problem.catalogs" name="catalogs"></el-input>
      <br />
      <br />标签:
      <el-input v-model="problem.tags" name="tags"></el-input>
      <br />
      <br />
      <input type="hidden" name="describe" v-model="problem.describe" />
      <br />题目描述:
      <mavon-editor v-model="problem.describe" />
      <br />
      <br />输入格式:
      <mavon-editor v-model="problem.input" />
      <br />
      <br />输出格式:
      <mavon-editor v-model="problem.output" />
      <br />
      <br />输入样例:
      <el-input v-model="problem.sample_input" name="sample_input" placeholder="输入样例"></el-input>
      <br />
      <br />输出样例:
      <el-input v-model="problem.sample_output" name="sample_output" placeholder="输出样例"></el-input>
      <br />对应分值
      标记
      <el-button type="primary">add</el-button>
      <br />
      <el-button type="primary" @click="issueProblem()">发布</el-button>
    </form>
  </el-main>
</template>

<script>
export default {
  data() {
    return {
      problem: {
        title: "",
        tags: "",
        catalogs: "",
        describe: "> 输入题目描述",
        input: "> 输入格式",
        output: "> 输出格式",
        sample_input: "",
        sample_output: ""
      }
    };
  },
  methods: {
    async issueProblem() {
      let oForm = new FormData(this.$refs["form1"]);
      console.log(this.$refs["form1"]);
      console.log(JSON.stringify(this.article));
      let res = await fetch("http://localhost:8088/api/issue", {
        method: "POST",
        body: oForm
      });
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>