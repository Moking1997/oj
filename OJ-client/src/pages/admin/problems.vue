<template>
  <div class>
    <router-view></router-view>
  </div>
</template>
<script>
import Headers from "@/pages/home/header";
import Priview from "@/components/problem/priview";
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
        path: "/admin/problem/edit",
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