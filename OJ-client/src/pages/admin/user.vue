<!--  -->
<template>
  <div>
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth">
          <el-select v-model="form.limit" placeholder="请选择用户权限">
            <el-option label="管理员" value="1"></el-option>
            <el-option label="普通用户" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="!edit" type="primary" @click="addUser">确 定</el-button>
        <el-button v-if="edit" type="primary" @click="editUser">修改</el-button>
      </div>
    </el-dialog>

    <el-button class="useradd" type="success" @click="userAdd()">添加用户</el-button>
    <el-table :data="users" style="width: 100%">
      <el-table-column label="用户名" prop="name"></el-table-column>
      <el-table-column label="密码" prop="password"></el-table-column>
      <el-table-column label="权限" prop="limit">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.limit == '1' ? 'danger' : 'primary'"
            disable-transitions
          >{{scope.row.limit| tagFilters}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入用户名搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="userEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="userDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      users: [],
      edit: false,
      dialogFormVisible: false,
      form: {
        name: "",
        password: "",
        limit: ""
      },
      formLabelWidth: "120px",
      currentPage: 1,
      total: 100
    };
  },
  methods: {
    userAdd() {
      this.edit = false;
      this.dialogFormVisible = true;
    },
    userEdit(index, row) {
      this.edit = true;
      this.form = row;
      this.dialogFormVisible = true;
    },

    async addUser() {
      let { data: res } = await this.$http.post("users/add", this.form);
      if (res.state == 0) {
        this.getUser();
        this.$message.success("添加成功");
        this.dialogFormVisible = false;
      } else if (res.state == 1) {
        this.$message.error("该用户名已存在");
      }
    },
    async editUser() {
      let { data: res } = await this.$http.post("users/edit", this.form);
      if (res.state == 0) {
        this.getUser();
        this.$message.success("修改成功");
        this.dialogFormVisible = false;
      } else if (res.state == 1) {
        this.$message.error("该用户名不存在");
      }
    },
    async getUser() {
      let { data: res } = await this.$http.get("users", {
        params: {
          like: this.search,
          currentPage: this.currentPage,
          limit: 10
        }
      });
      this.total = res.total;
      this.users = res.users;
    },
    async userDelete(index, row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { data: res } = await this.$http.post("users/detele", row);
          if (res.state == 0) {
            this.getUser();
            this.$message.success("删除成功");
            this.dialogFormVisible = false;
          } else if (res.state == 1) {
            this.$message.error("该用户名不存在");
          }
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

    handleCurrentChange(val) {
      this.getUser();
    }
  },
  watch: {
    search: function() {
      this.getUser();
    }
  },
  filters: {
    tagFilters: function(value) {
      if (value == 1) return "管理员";
      return "普通用户";
    }
  },
  created() {
    this.getUser();
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