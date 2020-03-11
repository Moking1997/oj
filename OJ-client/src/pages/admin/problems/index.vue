<template>
  <el-row>
    <Headers />
    <el-col :span="priview.pro">
      <el-table
        ref="filterTable"
        :data="problems.problems"
        style="width: 100%"
        @filter-change="handleFilterChange"
      >
        <el-table-column prop="problem_id" label="标号" width="180"></el-table-column>
        <el-table-column prop="title" label="标题" width="250">
          <template slot-scope="scope">
            <el-button
              @click="problemPriview(scope.row)"
              type="text"
              size="small"
            >{{scope.row.title}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="source" label="作者" width="180"></el-table-column>
        <el-table-column
          prop="tags"
          label="标签"
          column-key="tags"
          :filters="tags"
          :filter-multiple="false"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              disable-transitions
              v-for="tag in tagsTotag(scope.row.tags)"
              :key="tag.id"
              :type="tag === '11' ? 'danger' : 'primary'"
            >{{tag | tagFilters(tagFilter)}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="right" width="180">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="toProblem(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deteleProblem(scope.row)">删除</el-button>
            <!-- <el-button size="mini" type="primary" @click="joinCourseButton(scope.row)">加入课程</el-button> -->
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="problems.total"
      ></el-pagination>

      <!-- <el-dialog title="选择课程" :visible.sync="joinCourseVisible">
        <el-form :model="form">
          <el-form-item label="课程名称">
            <el-select v-model="form.course_id" placeholder="请选择课程">
              <el-option
                v-for="course in courses"
                :key="course.id"
                :label="course.title"
                :value="course.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="joinCourseVisible = false">取 消</el-button>
          <el-button type="primary" @click="joinCourse()">确 定</el-button>
        </div>
      </el-dialog>-->
    </el-col>
    <el-col :span="priview.pri">
      <Priview :priview="priview" :pri_problem="pri_problem" @childFn="closePriview" />
    </el-col>
  </el-row>
</template>
<script>
import Headers from "@/pages/admin/problems/header";
import Priview from "@/pages/admin/problems/priview";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      search: "",
      currentPage: 1,
      form: {
        course_id: "",
        problem_id: ""
      },
      joinCourseVisible: false,
      tags: [],
      tagFilter: [],
      pri_problem: [],
      priview: {
        display: false,
        pro: 24,
        pri: 0
      }
    };
  },
  components: {
    Headers,
    Priview
  },
  methods: {
    async deteleProblem(row) {
      this.$confirm("此操作将永久删除该题目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { data: res } = await this.$http.post("problem/detele", row);
          if (res.state == 0) {
            this.$message.success("删除题目成功");
            this.dialogFormVisible = false;
            this.setProblems();
            console.log(res);
          } else if (res.state == 1) {
            this.$message.error("该题目不存在");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    tagsTotag(tags) {
      var array = tags.split(",").filter(Boolean);
      let i = array.indexOf("0");
      array.splice(i, 1);
      return array;
    },
    handleFilterChange(val) {
      let tag = val.tags[0] | 0;
      let params = {
        course: this.course_id,
        currentPage: 1,
        tag: tag
      };
      this.setProblems(params);
    },
    joinCourseButton(row) {
      this.joinCourseVisible = true;
      this.form.problem_id = row.problem_id;
    },
    toProblem(row) {
      this.$router.push({
        path: "/admin/problems/edit",
        query: {
          id: row.problem_id
        }
      });
    },
    async joinCourse() {
      let { data: res } = await this.$http.post("course/addproblem", this.form);
      if (res.state == 0) {
        this.$message.success("题目加入课程成功");
        this.joinCourseVisible = false;
      } else {
        this.$message.error("课程中已有该题目");
      }
    },
    problemPriview(id) {
      this.priview.pro = 15;
      this.priview.pri = 9;
      this.pri_problem = id;
    },
    closePriview(span) {
      this.priview.pri = span;
      this.priview.pro = 24 - span;
    },
    filterTag(value, row) {
      return row.tags == value;
    },
    handleCurrentChange(val) {
      let params = {
        currentPage: val
      };
      this.setProblems(params);
    },
    async getTags() {
      let { data: res } = await this.$http.get("problems/tags");
      let hash = new Map();
      res.tags.forEach(element => {
        let data = element;
        hash.set(element.id, element.label);
        let keyMap = { id: "value", label: "text" };
        let objs = Object.keys(data).reduce((newData, key) => {
          let newKey = keyMap[key] || key;
          newData[newKey] = data[key];
          return newData;
        }, {});

        this.tags.push(objs);
      });
      this.tagFilter = hash;
    },
    ...mapActions(["setProblems"])
  },
  computed: {
    ...mapState(["problems"]),
    courses: function() {
      return this.$store.state.problems.courses;
    }
  },
  watch: {
    search: function() {
      let params = {
        search: this.search
      };
      this.setProblems(params);
    }
  },
  filters: {
    tagFilters: function(value, filter) {
      if (typeof filter.get == "function") {
        return filter.get(Number(value));
      }
      return value;
    }
  },
  created() {
    this.getTags();
    this.setProblems();
  }
};
</script>
<style scoped>
</style>