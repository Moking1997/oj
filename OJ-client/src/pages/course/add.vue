<!--  -->
<template>
  <div class="content">
    <div class="demo-input-suffix">
      课程名称:
      <el-input
        style="width:200px"
        placeholder="请输入课程名称"
        prefix-icon="el-icon-edit"
        v-model="title"
      ></el-input>
    </div>
    <br />选择知识点:
    <br />
    <br />
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
      <br />

      <el-button style="float:right;" @click="getCheckedNodes" type="primary">新增课程</el-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      title: ""
    };
  },
  methods: {
    async getCheckedNodes() {
      let result = this.$refs.tree.getCheckedNodes();
      let konwleges = ",";
      let array = [];
      let str = "";
      let tearcher_id = window.sessionStorage.getItem("id");
      let tearcher_name = window.sessionStorage.getItem("name");
      result.forEach(element => {
        konwleges += element.id + ",";
        str += element.label + "/";
        array.push(element.id);
      });
      if (this.title == "") {
        this.$message.error("请输入课程名称");
        return;
      }
      this.$confirm(`添加课程 ${this.title} , 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { data: res } = await this.$http.post("course/add", {
            konwleges: str,
            title: this.title,
            array: array,
            tearcher_id: tearcher_id,
            tearcher_name: tearcher_name
          });
          if (res.state == 0) {
            this.$message.success("添加课程成功");
            this.setCourses();
          } else {
            this.$message.error("该课程已存在");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    ...mapActions(["setProblems", "setKonwledge", "setCourses"])
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
    console.log(this.menu);
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.content {
  padding: 10px;
  margin: 10px;
}
</style>