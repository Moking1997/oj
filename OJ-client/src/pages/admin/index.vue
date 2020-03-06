<template>
  <el-container>
    <el-header>
      <Header />
    </el-header>

    <el-container>
      <el-aside width="200px">
        <Aside />
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>

    <el-footer>
      <Footer />
    </el-footer>
  </el-container>
</template>
<script>
import Header from "@/components/header";
import Footer from "@/components/footer";
import Aside from "@/pages/admin/aside";

export default {
  name: "index",
  components: {
    Header,
    Footer,
    Aside
  },
  data() {
    return {};
  },
  computed: {},
  created() {}
};
</script>

<style  scoped lang="less">
</style>
