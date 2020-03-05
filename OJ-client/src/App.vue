<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
html * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.el-header {
  background: #409eff;
}
.el-aside {
  background-color: rgb(84, 92, 100);
}
.el-footer {
  background: #111;
  color: #fff;
}
</style>
