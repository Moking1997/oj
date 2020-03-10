<template>
  <div class>
    <el-row>
      <el-col :span="12" style="text-align:left;">
        <el-cascader
          v-model="data"
          :options="tree"
          :props="{ checkStrictly: true ,expandTrigger:'hover',value:'id'}"
          clearable
          @change="getCheckedNodes"
        ></el-cascader>
        <el-checkbox v-model="privatechecked">查看私人题目</el-checkbox>
      </el-col>
      <el-col :span="12" style="text-align:right;">
        <router-link to="/problem/add">
          <el-button type="primary">新建题目</el-button>
        </router-link>
        <el-button type="success">批量添加题库集</el-button>
      </el-col>
    </el-row>
    <br />
    <el-tabs v-model="activeType" type="card" @tab-click="changeType">
      <el-tab-pane label="全部" name></el-tab-pane>
      <el-tab-pane v-for="type in types" :key="type.id" :label="type.label" :name="type.label"></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      privatechecked: false,
      data: 0,
      activeType: ""
    };
  },
  methods: {
    getCheckedNodes(val) {
      let catalog = val[val.length - 1];
      let params = {
        currentPage: 1,
        catalog: catalog
      };
      this.setProblems(params);
    },
    changeType(tab, event) {
      let params = {
        type: tab.name
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
    },
    types: function() {
      return this.$store.state.problems.types;
    }
  },
  watch: {
    listCatalog(val) {
      if (this.menu.indexOf(Number(val)) != -1) {
        this.data = Number(val);
      }
    },
    privatechecked(val) {
      let personal = 0;
      if (val) {
        personal = window.sessionStorage.getItem("id");
      }
      let params = {
        personal: personal
      };
      this.setProblems(params);
    }
  },
  created() {}
};
</script>