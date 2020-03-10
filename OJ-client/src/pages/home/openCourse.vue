<!--  -->
<template>
  <div>
    <el-page-header @back="$router.go(-1)" content="公共课程"></el-page-header>
    <br />
    <el-dialog title="课程信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="新建课程名称" :label-width="formLabelWidth">
          <el-input v-model="form.label" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="joinCourse()">确 定</el-button>
      </div>
    </el-dialog>
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
          <el-button type="primary" size="mini" @click="FormVisible(scope.row)">加入个人课程</el-button>
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
      form: {
        label: "",
        course_id: "",
        konwleges: ""
      },
      courses: [],
      search: "",
      formLabelWidth: "120px",
      dialogFormVisible: false
    };
  },
  methods: {
    FormVisible(row) {
      this.dialogFormVisible = true;
      this.form.course_id = row.id;
      this.form.konwleges = row.konwleges;
    },
    async joinCourse(index, row) {
      let data = {
        tearcher_id: window.sessionStorage.getItem("id"),
        title: this.form.label,
        course_id: this.form.course_id,
        konwleges: this.form.konwleges,
        tearcher_name: window.sessionStorage.getItem("name")
      };
      let { data: res } = await this.$http.post("course/joinCourse", data);
      if (res.state == 0) {
        this.setTags();
        this.$message.success("加入个人课程成功");
        this.dialogFormVisible = false;
        this.getCourse();
      } else {
        this.$message.error("加入个人课程失败");
      }
    },
    async getCourse() {
      let { data: res } = await this.$http.get("openCourses");
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