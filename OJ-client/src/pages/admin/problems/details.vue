<!--  -->
<template>
  <div>
    <el-page-header @back="goBack" content="详情页面"></el-page-header>
    <el-row justify="space-between">
      <el-col :span="18">
        <div class="problem-priview">
          <h1>{{data.title}}</h1>
          <div class="problem-inner">
            <div class="problem-describe">
              <div v-html="data.description" class="content-title">{{data.description}}</div>
            </div>
            <div class="problem-input">
              <div class="content-title">输入格式:</div>
              <div v-html="data.input" class="content-text">{{data.input}}</div>
            </div>
            <div class="problem-output">
              <div class="content-title">输出格式:</div>
              <div v-html="data.output" class="content-text">{{data.output}}</div>
            </div>
            <div class="problem-incase">
              <div class="content-title">输入样例:</div>
              <div class="content-case">{{data.sample_input}}</div>
            </div>
            <div class="problem-outcase">
              <div class="content-title">输入样例:</div>
              <div class="content-case">{{data.sample_output}}</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>基本信息</span>
          </div>
          <div>标号:{{data.problem_id}}</div>
          <div v-if="data.source">作者:{{data.source}}</div>
          <div>通过率:{{(data.accepted/data.submit).toFixed(2)}}</div>
          <div>发布时间:{{data.in_date | timestampToTime}}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      data: []
    };
  },
  methods: {
    async getData() {
      let { data: res } = await this.$http.get("problem", {
        params: {
          id: this.$route.query.id
        }
      });
      this.data = res.data[0];
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getData();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>

<style scoped>
/* @import url(); 引入css类 */
.problem-priview {
  padding: 20px;
}
.content-title {
  font-size: 18px;
  margin-top: 10px;
}
.content-text {
  font-size: 12px;
  color: #444;
}
.content-case {
  padding: 8px;
  font-size: 12px;
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #666;
}
</style>