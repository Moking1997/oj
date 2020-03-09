<!--  -->
<template>
  <div>
    <el-drawer title="新增课程" :visible.sync="drawer" :with-header="false">
      <Add />
    </el-drawer>
    <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">新增课程</el-button>

    <el-table :data="courses" style="width: 100%">
      <el-table-column prop="id" label="标号" width="180"></el-table-column>
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="konwleges" label="知识点"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <el-button size="mini" type="danger" @click="courseDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Add from "@/pages/course/add";

export default {
  components: {
    Add
  },
  data() {
    return {
      drawer: false
    };
  },

  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    courseDelete(row) {
      this.$confirm(`此操作将永久删除该课程 , 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { data: res } = await this.$http.post("course/detele", row);
          if (res.state == 0) {
            this.$message.success("删除课程成功");
            this.setCourses();
          } else {
            this.$message.error("该课程不存在");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    ...mapActions(["setProblems", "setCourses"])
  },
  computed: {
    courses: function() {
      return this.$store.state.problems.courses;
    }
  },
  created() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>