<template>
  <el-row>
    <Headers />
    <el-col :span="priview.pro">
      <el-table ref="filterTable" :data="problems.problems" style="width: 100%">
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
        <el-table-column prop="type" label="类型" width="180"></el-table-column>
        <el-table-column
          prop="tags"
          label="标签"
          width="100"
          :filters="tags"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag disable-transitions>{{scope.row.tags| tagFilters(tagFilter)}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="joinCourseButton(scope.row)">加入课程</el-button>
            <!-- <el-button size="mini" type="danger" @click="courseDelete(scope.row)">删除</el-button> -->
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

      <el-dialog title="选择课程" :visible.sync="joinCourseVisible">
        <el-form :model="form">
          <el-form-item label="课程名称">
            <el-select v-model="form.course_id" placeholder="请选择活动区域">
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
      </el-dialog>
    </el-col>
    <el-col :span="priview.pri">
      <Priview :priview="priview" :pri_problem="pri_problem" @childFn="closePriview" />
    </el-col>
  </el-row>
</template>
<script>
import Headers from "@/pages/home/header";
import Priview from "@/components/problem/priview";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
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
    joinCourseButton(row) {
      this.joinCourseVisible = true;
      this.form.problem_id = row.problem_id;
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
        currentPage: val,
        catalog: this.problems.catalog,
        tag: this.problems.tag
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
  watch: {},
  filters: {
    tagFilters: function(value, filter) {
      if (typeof filter.get == "function") {
        return filter.get(Number(value));
      }
      return value;
    }
  },
  created() {
    // this.setProblems();
    this.getTags();
  }
};
</script>
<style scoped>
</style>