<template>
  <div class>
    <div class="block">
      <el-cascader
        v-model="data"
        :options="tree"
        :props="{ checkStrictly: true ,expandTrigger:'hover',value:'id'}"
        clearable
        @change="getCheckedNodes"
      ></el-cascader>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      menu: [],
      data: 0,
      tree: []
    };
  },
  methods: {
    changeValue(val) {
      if (this.data == 1) {
        this.data = 2;
      } else {
        this.data = 1;
      }
    },
    getCheckedNodes(val) {
      let catalog = val[val.length - 1];
      let params = {
        currentPage: this.problems.currentPage,
        catalog: catalog,
        tag: this.problems.currentPage
      };
      this.setProblems(params);
    },
    async getTree(element) {
      try {
        let { data: res } = await this.$http.get("problems/catalogs", {
          params: {
            parentID: element.id
          }
        });
        let children = res.data;
        this.$set(element, "children", children);

        if (children.length != 0) {
          element.children.forEach(async element => {
            this.getTree(element);
          });
        } else {
          delete element.children;
        }
      } catch (err) {
        console.log(err);
        alert("请求出错！");
      }
    },
    async getTreeHead() {
      try {
        let { data: res } = await this.$http.get("problems/catalogs", {
          params: {
            parentID: 0
          }
        });
        this.tree = res.data;
        // this.menu = res.data;
        this.tree.forEach(async element => {
          this.menu.push(element.id);
          this.getTree(element);
        });
      } catch (err) {
        console.log(err);
        alert("请求出错！");
      }
    },
    ...mapActions(["setProblems"])
  },
  computed: {
    ...mapState(["problems"]),
    listCatalog() {
      return this.$store.state.problems.catalog;
    }
  },
  watch: {
    listCatalog(val) {
      if (this.menu.indexOf(Number(val)) != -1) {
        this.data = Number(val);
      }
    }
  },
  created() {
    this.getTreeHead();
  }
};
</script>