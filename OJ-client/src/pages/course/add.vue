<!--  -->
<template>
  <div>
    <div class="demo-drawer__content">
      <el-tree
        :data="tree"
        node-key="ID"
        default-expand-all
        show-checkbox
        :expand-on-click-node="false"
        ref="tree"
      >
        <span class="custom-tree-node" slot-scope="{ node }">
          <span>{{ node.label}}</span>
          <span></span>
        </span>
      </el-tree>
      <el-button @click="getCheckedNodes">通过 node 获取</el-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    getCheckedNodes() {
      let res = this.$refs.tree.getCheckedNodes();
      let konwleges = ",";
      let array = [];
      let tearcher_id = window.sessionStorage.getItem(id);
      res.forEach(element => {
        konwleges += element.id + ",";
        array.push(element.id);
      });
      res.forEach(element => {
        let str = "," + element.parentID + ",";
        let reg = new RegExp(str, "g");
      });

      this.$http.post("course/add", {
        title: "16计算机",
        array: array,
        id: id
      });
    },
    ...mapActions(["setProblems", "setKonwledge"])
  },
  computed: {
    ...mapState(["problems", "konwledge"]),
    tree: function() {
      return this.$store.state.problems.konwledge;
    },
    menu: function() {
      return this.$store.state.problems.konwledgeMenu;
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    // this.setKonwledge();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>