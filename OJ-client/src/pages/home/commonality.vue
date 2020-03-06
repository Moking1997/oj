<template>
  <div class>
    {{tags}}
    <Catalogs />
    <el-table ref="filterTable" :data="problems.problems" style="width: 100%">
      <el-table-column prop="problem_id" label="标号" width="180"></el-table-column>
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="score" label="分数" width="180"></el-table-column>
      <el-table-column prop="type" label="类型" width="180"></el-table-column>
      <el-table-column
        prop="tags"
        label="标签"
        width="100"
        @change="changeTag"
        :filters="tags"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag disable-transitions>{{scope.row.tags}}</el-tag>
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
  </div>
</template>
<script>
import Catalogs from "./catalogs";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      currentPage: 1,
      tags: []
    };
  },
  components: {
    Catalogs
  },
  methods: {
    changeTag() {
      console.log("value, row");
    },
    filterTag(value, row) {
      // let params = {
      //   currentPage: this.problems.currentPage,
      //   catalog: this.problems.catalog,
      //   tag: value
      // };
      // this.setProblems(params);
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    handleCurrentChange(val) {
      let params = {
        currentPage: val,
        catalog: this.problems.catalog,
        tag: this.problems.currentPage
      };
      this.setProblems(params);
    },
    getTags() {
      this.problems.tags.forEach(element => {
        let data = element;
        let keyMap = { id: "value", label: "text" };
        let objs = Object.keys(data).reduce((newData, key) => {
          let newKey = keyMap[key] || key;
          newData[newKey] = data[key];
          return newData;
        }, {});

        this.tags.push(objs);
      });
    },
    ...mapActions(["setProblems", "setTags"])
  },
  computed: {
    ...mapState(["problems"])
  },
  watch: {},
  created() {
    this.setTags();
    this.setProblems();
    this.getTags();
  }
};
</script>
<style scoped>
</style>