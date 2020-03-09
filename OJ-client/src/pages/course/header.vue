<template>
  <el-row>
    <el-col :span="12" style="text-align:left;">
      <el-cascader
        v-model="data"
        :options="tree"
        :props="{ checkStrictly: true ,expandTrigger:'hover',value:'id'}"
        clearable
        @change="getCheckedNodes"
      ></el-cascader>
    </el-col>
    <el-col :span="12" style="text-align:right;">
      <router-link to="/problem/add">
        <el-button type="primary">新建题目</el-button>
      </router-link>
      <el-button type="success">批量添加题库集</el-button>
    </el-col>
  </el-row>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      data: 0
    };
  },
  methods: {
    getCheckedNodes(val) {
      let catalog = val[val.length - 1];
      let params = {
        currentPage: this.problems.currentPage,
        catalog: catalog,
        tag: this.problems.tag,
        course: this.problems.course
      };
      this.setProblems(params);
    },
    ...mapActions(["setProblems", "setKonwledge"])
  },
  computed: {
    ...mapState(["problems", "konwledge"]),
    listCatalog() {
      return this.$store.state.problems.catalog;
    },
    tree: function() {
      return this.$store.state.problems.konwledge;
    },
    menu: function() {
      return this.$store.state.problems.konwledgeMenu;
    }
    //  data: function() {
    //   if (this.menu.indexOf(Number(val)) != -1) {
    //     return Number(val);
    //   }
    //   return
    // },
  },
  watch: {
    listCatalog(val) {
      if (this.menu.indexOf(Number(val)) != -1) {
        this.data = Number(val);
      }
    }
  },
  created() {
    this.data = Number(this.$store.state.problems.catalog);
  }
};
</script>