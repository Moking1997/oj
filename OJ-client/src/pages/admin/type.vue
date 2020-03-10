<!--  -->
<template>
  <div>
    <el-page-header @back="$router.go(-1)" content="类型管理"></el-page-header>

    <el-dialog title="类型信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="类型名称" :label-width="formLabelWidth">
          <el-input v-model="form.label" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="!edit" type="primary" @click="addType">确 定</el-button>
        <el-button v-if="edit" type="primary" @click="editType">修改</el-button>
      </div>
    </el-dialog>

    <el-button class="useradd" type="success" @click="typeAdd()">添加类型</el-button>

    <el-table
      :data="types.filter(data => !search || data.label.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="标号" prop="id"></el-table-column>
      <el-table-column label="标题" prop="label"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="typeEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="typeDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      search: "",
      edit: false,
      dialogFormVisible: false,
      form: {
        label: "",
        id: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    typeAdd() {
      this.edit = false;
      this.dialogFormVisible = true;
    },
    typeEdit(index, row) {
      this.edit = true;
      this.form.label = row.label;
      this.form.id = row.id;
      this.dialogFormVisible = true;
    },

    async addType() {
      let { data: res } = await this.$http.post("problems/type/add", this.form);
      if (res.state == 0) {
        this.setTypes();
        this.$message.success("添加成功");
        this.dialogFormVisible = false;
      } else if (res.state == 1) {
        this.$message.error("该类型已存在");
      }
    },
    async editType() {
      let { data: res } = await this.$http.post(
        "problems/type/edit",
        this.form
      );
      if (res.state == 0) {
        this.setTypes();
        this.$message.success("修改成功");
        this.dialogFormVisible = false;
      } else if (res.state == 2) {
        this.$message.error("该类型已存在");
      } else if (res.state == 1) {
        this.$message.error("该类型不存在");
      }
    },
    async typeDelete(index, row) {
      this.$confirm("此操作将永久删除该类型, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { data: res } = await this.$http.post(
            "problems/type/detele",
            row
          );
          if (res.state == 0) {
            this.$message.success("删除类型成功");
            this.dialogFormVisible = false;
            this.setTypes();
          } else if (res.state == 1) {
            this.$message.error("该类型不存在");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    ...mapActions(["setTypes"])
  },
  watch: {
    // search: function() {
    //   this.setTypes();
    // }
  },
  computed: {
    types: function() {
      return this.$store.state.problems.types;
    }
  },
  created() {
    this.setTypes();
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.useradd {
  float: right;
  margin-right: 10px;
}
</style>