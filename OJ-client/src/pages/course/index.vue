<template>
  <el-row>
    个人课程
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
            <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-button size="mini" type="danger" @click="courseDelete(scope.row)">删除</el-button>
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
    </el-col>
    <el-col :span="priview.pri">
      <Priview :priview="priview" :pri_problem="pri_problem" @childFn="closePriview" />
    </el-col>
  </el-row>
</template>
<script>
import Headers from "@/pages/course/header";
import Priview from "@/components/problem/priview";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      course_id: 0,
      currentPage: 1,
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
      this.getProblems(val);
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
    courseDelete(row) {
      this.$confirm(`此操作将把该题目从课程中删除 , 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let problem_id = row.problem_id;
          let { data: res } = await this.$http.post("course/deteleproblem", {
            problem_id: problem_id,
            course_id: this.course_id
          });
          if (res.state == 0) {
            this.$message.success("删除题目成功");
            this.getProblems();
          } else {
            this.$message.error("该题目不存在,删除失败");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getProblems(page) {
      let currentPage = page || this.problems.currentPage;
      let catalog = this.problems.catalog;
      let params = {
        course: this.course_id,
        currentPage: currentPage,
        catalog: catalog,
        tag: this.problems.tag
      };
      this.setProblems(params);
      this.getTags();
    },
    ...mapActions(["setProblems"])
  },
  computed: {
    ...mapState(["problems"])
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
    this.course_id = this.$route.query.course_id;
    this.getProblems(1);
  }
};
</script>
<style scoped>
</style>