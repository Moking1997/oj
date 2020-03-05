<!--  -->
<template>
  <div class="custom-tree-container">
    <div class="block">
      <el-row type="flex" justify="space-between">
        <el-col :span="18">
          <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        </el-col>
        <el-col :span="6" style="text-align:right">
          <el-button type="primary" @click="append({ID:0})">添加根节点</el-button>
        </el-col>
      </el-row>
      <br />
      <!-- {{tree}} -->
      <el-tree
        :data="tree"
        node-key="ID"
        default-expand-all
        :filter-node-method="filterNode"
        :expand-on-click-node="false"
        ref="tree"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label}}</span>
          <span>
            <el-button type="text" size="mini" @click="() => append(data)">添加</el-button>
            <el-button type="text" size="mini" @click="() => remove(data)">删除</el-button>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tree: [],
      filterText: ""
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    append(data) {
      this.$prompt("请输入知识点名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputErrorMessage: "输入格式不正确"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你的内容是: " + value
          });
          this.addNode(data.ID, value);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    async addNode(parentID, label) {
      let data = new FormData();
      data.append("parentID", parentID);
      data.append("label", label);
      await axios
        .post("http://localhost:8088/api/problem/catalog/add/id", data)
        .then(res => {
          console.log("res=>", res);
        });
    },
    async removeNode(id) {
      let data = new FormData();
      data.append("id", id);
      await axios
        .post("http://localhost:8088/api/problem/catalog/delete/id", data)
        .then(res => {
          console.log("res=>", res);
        });
    },
    remove(data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.removeNode(data.ID);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async getTree(element) {
      try {
        let res = await axios.get(
          "http://localhost:8088/api/catalog/" + element.ID
        );
        let children = res.data;
        this.$set(element, "children", children);

        if (children.length != 0) {
          element.children.forEach(async element => {
            this.getTree(element);
          });
        }
      } catch (err) {
        console.log(err);
        alert("请求出错！");
      }
    },
    //使用 asyns/await
    async getTreeHead() {
      try {
        let res = await axios.get("http://localhost:8088/api/catalog/0");
        this.tree = res.data;
        this.tree.forEach(async element => {
          this.getTree(element);
        });
      } catch (err) {
        console.log(err);
        alert("请求出错！");
      }
    }
  },
  async created() {
    console.log("start");
  },
  computed: {}
};
</script>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>