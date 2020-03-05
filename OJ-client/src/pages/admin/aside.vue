<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    @select="selectEvent"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="1">
      <i class="el-icon-menu"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">知识点管理</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-setting"></i>
      <span slot="title">导航3</span>
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
      //   console.log(key, keyPath);
      if (key == 1) {
        this.$router.push({ path: "/admin/user" });
      } else if (key == 2) {
        this.$router.push({ path: "/admin/knowledge" });
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