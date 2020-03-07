<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    @open="handleOpen"
    @select="selectEvent"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-user"></i>
        <span>公共题库</span>
      </template>
      <el-menu-item
        :index="String('1-'+catalog.id)"
        v-for="catalog in catalogs"
        :key="catalog.id"
      >{{catalog.label}}</el-menu-item>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-collection-tag"></i>
      <span slot="title">私有题库</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      catalogs: []
    };
  },
  methods: {
    selectEvent(key, keyPath) {
      if (key == 1) {
        this.$router.push({ path: "/home/commonality" });
      } else if (key == 2) {
        this.$router.push({ path: "/home/private" });
      } else {
        let catalogs = key.slice(2);
        let params = {
          currentPage: this.problems.currentPage,
          catalog: catalogs,
          tag: this.problems.currentPage
        };
        this.setProblems(params);
      }
    },
    handleOpen(key, keyPath) {
      this.selectEvent(key, keyPath);
    },
    ...mapActions(["setProblems"])
  },
  computed: {
    ...mapState(["problems"])
  },
  //生命周期 - 创建完成（访问当前this实例）
  async created() {
    let { data: res } = await this.$http.get("problems/catalogs", {
      params: {
        parentID: 0
      }
    });
    this.catalogs = res.data;
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>