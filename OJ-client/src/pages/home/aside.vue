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
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-collection-tag"></i>
        <span slot="title">私有题库</span>
      </template>
      <el-menu-item index="2-0">
        <!-- <el-button type="primary" @click="toAdd">新建课程</el-button> -->
        <i class="el-icon-setting"></i>
        <span slot="title">课程管理</span>
      </el-menu-item>
      <el-menu-item
        :index="String('2-'+course.id)"
        v-for="course in courses"
        :key="course.id"
      >{{course.title}}</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    selectEvent(key, keyPath) {
      if (keyPath[0] == 1) {
        let catalogs = 0;
        if (key != 1) {
          catalogs = key.slice(2);
          let params = {
            course: 0,
            currentPage: 1,
            catalog: catalogs,
            tag: this.problems.tag
          };
          this.setProblems(params);
        }
        this.$router.push({
          path: "/home/commonality",
          query: {
            catalog: catalogs
          }
        });
      } else if (keyPath[0] == 2) {
        if (key.slice(2) == 0) {
          this.$router.push({ path: "/home/private/set" });
        } else {
          if (key != 2) {
            let course = key.slice(2);
            let params = {
              currentPage: 1,
              catalog: this.problems.catalog,
              course: course,
              tag: this.problems.tag
            };
            this.setProblems(params);
          }
          this.$router.push({
            path: "/home/private",
            query: {
              course_id: key.slice(2)
            }
          });
        }
      }
    },
    handleOpen(key, keyPath) {
      this.selectEvent(key, keyPath);
    },
    ...mapActions(["setProblems", "setCourses"])
  },
  computed: {
    ...mapState(["problems"]),
    courses: function() {
      return this.$store.state.problems.courses;
    },
    catalogs: function() {
      return this.$store.state.problems.konwledgeHeader;
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