<template>
  <el-container>
    <el-header>
      <Header />
    </el-header>

    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>

    <el-footer>
      <Footer />
    </el-footer>
  </el-container>
</template>
<script>
import Header from "@/components/header";
import Footer from "@/components/footer";
// import Aside from "@/components/aside";
// import Main from "@/components/main";

export default {
  name: "index",
  components: {
    Header,
    Footer
    // Main,
    // Aside
  },
  data() {
    return {};
  }
};
</script>

<style  scoped lang="less">
</style>
