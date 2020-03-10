<!--  -->
<template>
  <div>
    <el-page-header @back="$router.go(-1)" content="课程列表"></el-page-header>
    <br />
    <el-table
      :data="courses.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="标号" prop="id"></el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="教师" prop="tearcher_name"></el-table-column>
      <el-table-column label="知识点" prop="konwleges"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入课程名搜索" />
        </template>
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.open==1"
            type="primary"
            size="mini"
            @click="changeOpen(scope.$index, scope.row)"
          >设置为公共课程</el-button>
          <el-button
            v-if="scope.row.open==0"
            type="success"
            size="mini"
            @click="changeOpen(scope.$index, scope.row)"
          >设置为私人课程</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      courses: [],
      search: "",
      formLabelWidth: "120px"
    };
  },
  methods: {
    async changeOpen(index, row) {
      let { data: res } = await this.$http.post("course/open", row);
      if (res.state == 0) {
        this.setTags();
        this.$message.success("设置成功");
        this.dialogFormVisible = false;
        this.getCourse();
      } else if (res.state == 1) {
        this.$message.error("设置失败");
      }
    },

    async getCourse() {
      let { data: res } = await this.$http.get("courses");
      this.courses = res.data;
    },
    ...mapActions(["setTags"])
  },
  created() {
    this.getCourse();
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.useradd {
  float: right;
  margin-right: 10px;
}
</style>