<!--  -->
<template>
  <div>
    <el-table :data="dataList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table :data="props.row.content" border style="width: 100%">
            <el-table-column prop="id" label="编号" width="180"></el-table-column>
            <el-table-column prop="label" label="标题" width="180"></el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="字段信息查询" prop="title"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      dataList: [
        {
          title: "分类",
          content: []
        },
        {
          title: "标签",
          content: []
        },
        {
          title: "类型",
          content: []
        }
      ]
    };
  },
  methods: {
    async getList() {
      let { data: res } = await this.$http.get("problems/catalogs");
      this.dataList[0].content = res.data;
      this.dataList[1].content = this.tags;
      this.dataList[2].content = this.types;
    },

    ...mapActions(["setTags", "setTypes"])
  },
  computed: {
    tags: function() {
      return this.$store.state.problems.tags;
    },
    types: function() {
      return this.$store.state.problems.types;
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.setTags();
    this.setTypes();
    this.getList();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>