<!--  -->
<template>
  <el-main>
    <el-page-header @back="$router.go(-1)" content="新增题目"></el-page-header>
    <br />
    <form ref="form1" method="post" enctype="multipart/form-data">
      <el-row :gutter="20">
        <el-col :span="12">
          <h4>题目名称:</h4>
          <el-input v-model="problem.title" name="title"></el-input>
          <el-checkbox v-model="privatechecked">仅自己可见</el-checkbox>
        </el-col>

        <el-col :span="6">
          <h4>分值:</h4>
          <el-input v-model="problem.score" name="title"></el-input>
        </el-col>
        <el-col :span="6">
          <h4>作者:</h4>
          <el-input v-model="problem.source" name="title"></el-input>
        </el-col>
      </el-row>
      <br />
      <el-row :gutter="20">
        <el-col :span="7">
          <h4>分类:</h4>
          <el-cascader
            v-model="catalogDate"
            :options="catalogsTree"
            :props="{ checkStrictly: true ,expandTrigger:'hover',value:'id'}"
            clearable
            @change="getCatalogs"
          ></el-cascader>
        </el-col>
        <el-col :span="7">
          <h4>类型:</h4>
          <el-select @change="getType" v-model="typeDate" placeholder="请选择">
            <el-option v-for="item in types" :key="item.id" :label="item.label" :value="item.label"></el-option>
          </el-select>
        </el-col>
        <el-col :span="10">
          <h4>标签:</h4>
          <el-select
            @change="getTags"
            v-model="tagDate"
            multiple
            placeholder="请选择"
            style="width:300px"
          >
            <el-option v-for="item in tags" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <br />
      <input type="hidden" name="describe" v-model="problem.description" />
      <br />
      <h4>题目描述:</h4>
      <mavon-editor v-model="problem.description" />
      <br />
      <br />
      <h4>输入格式:</h4>
      <mavon-editor v-model="problem.input" />
      <br />
      <br />
      <h4>输出格式:</h4>
      <mavon-editor v-model="problem.output" />
      <br />
      <br />
      <h4>题目输入样例:</h4>
      <el-input v-model="problem.sample_input" name="sample_input" placeholder="输入样例"></el-input>
      <br />
      <br />
      <h4>题目输出样例:</h4>
      <el-input v-model="problem.sample_output" name="sample_output" placeholder="输出样例"></el-input>
      <br />
      <br />
      <el-button style="float:right" type="primary" @click="issueProblem()">发布</el-button>
    </form>
  </el-main>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      privatechecked: false,
      tagDate: "",
      typeDate: "",
      catalogDate: "",
      problem: {
        personal: 0,
        title: "",
        score: 0,
        source: "",
        type: "",
        tags: ",0,",
        catalogs: ",0,",
        description: "",
        input: "",
        output: "",
        sample_input: "",
        sample_output: ""
      }
    };
  },
  methods: {
    async issueProblem() {
      let { data: res } = await this.$http.post("problem/add", this.problem);
      if (res.state == 0) {
        this.$message.success("添加题目成功");
      } else {
        this.$message.error("添加题目失败");
      }
    },
    getCatalogs(val) {
      let arr = val.join(",");
      this.problem.catalogs = ",0," + arr + ",";
    },
    getTags(val) {
      let arr = val.join(",");
      this.problem.tags = ",0," + arr + ",";
      console.log(this.problem.tags);
    },
    getType(val) {
      this.problem.type = val;
    },
    ...mapActions(["setTags", "setTypes", "setKonwledge"])
  },
  computed: {
    catalogsTree: function() {
      return this.$store.state.problems.konwledge;
    },
    types: function() {
      return this.$store.state.problems.types;
    },
    tags: function() {
      return this.$store.state.problems.tags;
    }
  },
  watch: {
    privatechecked(val) {
      let personal = 0;
      if (val) {
        this.problem.personal = window.sessionStorage.getItem("id");
      } else {
        this.problem.personal = 0;
      }
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.setTags();
    this.setTypes();
    this.setKonwledge();
    this.problem.source = window.sessionStorage.getItem("name");
  },

  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>