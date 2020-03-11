<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    @select="selectEvent"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="1">
      <i class="el-icon-user"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-menu-item index="6">
      <i class="el-icon-notebook-2"></i>
      <span slot="title">题目管理</span>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="el-icon-collection-tag"></i>
      <span slot="title">知识点管理</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-help"></i>
      <span slot="title">类型管理</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-price-tag"></i>
      <span slot="title">标签管理</span>
    </el-menu-item>
    <el-menu-item index="5">
      <i class="el-icon-notebook-1"></i>
      <span slot="title">课程列表</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    selectEvent(key, keyPath) {
      if (key == 1) {
        this.$router.push({ path: "/admin/user" });
      } else if (key == 2) {
        this.$router.push({ path: "/admin/knowledge" });
      } else if (key == 3) {
        this.$router.push({ path: "/admin/type" });
      } else if (key == 4) {
        this.$router.push({ path: "/admin/tags" });
      } else if (key == 5) {
        this.$router.push({ path: "/admin/course" });
      } else if (key == 6) {
        this.$router.push({ path: "/admin/problems" });
      }
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>