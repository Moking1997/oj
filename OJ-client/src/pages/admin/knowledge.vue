<!--  -->
<template>
  <div class="custom-tree-container">
    <el-page-header @back="$router.go(-1)" content="知识点管理"></el-page-header>
    <br />
    <div class="block">
      <el-row type="flex" justify="space-between">
        <el-col :span="18">
          <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        </el-col>
        <el-col :span="6" style="text-align:right">
          <el-button type="primary" @click="append({id:0})">添加根节点</el-button>
        </el-col>
      </el-row>
      <br />
      <!-- {{tree}} -->
      <el-tree
        :data="tree"
        node-key="id"
        default-expand-all
        :filter-node-method="filterNode"
        :expand-on-click-node="false"
        ref="tree"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label}}</span>
          <span>
            <el-button type="text" size="mini" @click="() => append(data)">添加</el-button>
            <el-button type="text" size="mini" @click="() => remove(data,node)">删除</el-button>
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
          this.addNode(data, value);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    async addNode(data, label) {
      let { data: res } = await axios.post("problems/catalogs/add", {
        parentID: data.id,
        label: label
      });
      if (res.state == 1) {
        this.$message.error("该知识点已存在");
      } else {
        let newChild = {
          id: res.id,
          parentID: data.id,
          label: label,
          children: []
        };
        data.children.push(newChild);
        this.$message({
          type: "success",
          message: "你添加的知识点为: " + label
        });
      }
    },
    async removeNode(id) {
      await this.$http.post("problems/catalogs/detele", {
        id: id
      });
    },
    remove(data, node) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.post("problems/catalogs/detele", {
            id: data.id
          });
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === data.id);
          children.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
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
    this.getTreeHead();
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