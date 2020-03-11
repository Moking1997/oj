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
import Aside from "@/pages/home/aside";
import { mapActions, mapState } from "vuex";

export default {
  name: "home",
  components: {
    Header,
    Footer,
    Aside
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["setProblems", "setKonwledge", "setCourses", "setTypes"])
  },
  created() {
    this.setKonwledge();
    this.setCourses();
    this.setTypes();
    this.setProblems();
  }
};
</script>

<style  scoped lang="less">
</style>
