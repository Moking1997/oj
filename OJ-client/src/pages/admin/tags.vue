<!--  -->
<template>
  <div>
    <el-page-header @back="$router.go(-1)" content="标签管理"></el-page-header>

    <el-dialog title="标签信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="标签名称" :label-width="formLabelWidth">
          <el-input v-model="form.label" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="!edit" type="primary" @click="addTags">确 定</el-button>
        <el-button v-if="edit" type="primary" @click="editTags">修改</el-button>
      </div>
    </el-dialog>

    <el-button class="useradd" type="success" @click="tagsAdd()">添加标签</el-button>

    <el-table
      :data="tags.filter(data => !search || data.label.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="标号" prop="id"></el-table-column>
      <el-table-column label="标题" prop="label"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="tagsEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="tagsDelete(scope.$index, scope.row)">删除</el-button>
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
    tagsAdd() {
      this.edit = false;
      this.dialogFormVisible = true;
    },
    tagsEdit(index, row) {
      this.edit = true;
      this.form.label = row.label;
      this.form.id = row.id;
      this.dialogFormVisible = true;
    },

    async addTags() {
      let { data: res } = await this.$http.post("problems/tags/add", this.form);
      if (res.state == 0) {
        this.setTags();
        this.$message.success("添加成功");
        this.dialogFormVisible = false;
      } else if (res.state == 1) {
        this.$message.error("该标签已存在");
      }
    },
    async editTags() {
      let { data: res } = await this.$http.post(
        "problems/tags/edit",
        this.form
      );
      if (res.state == 0) {
        this.setTags();
        this.$message.success("修改成功");
        this.dialogFormVisible = false;
      } else if (res.state == 2) {
        this.$message.error("该标签已存在");
      } else if (res.state == 1) {
        this.$message.error("该标签不存在");
      }
    },
    async tagsDelete(index, row) {
      this.$confirm("此操作将永久删除该标签, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { data: res } = await this.$http.post(
            "problems/tags/detele",
            row
          );
          if (res.state == 0) {
            this.$message.success("删除标签成功");
            this.dialogFormVisible = false;
            this.setTags();
          } else if (res.state == 1) {
            this.$message.error("该标签不存在");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    ...mapActions(["setTags"])
  },
  computed: {
    tags: function() {
      return this.$store.state.problems.tags;
    }
  },
  created() {
    this.setTags();

    // this.tags = this.$store.state.problems.tags;
    // console.log(this.tags);
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