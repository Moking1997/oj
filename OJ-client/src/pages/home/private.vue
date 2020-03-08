<!--  -->
<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    ...mapActions(["setProblems", "setKonwledge"])
  },
  computed: {
    ...mapState(["problems", "konwledge"]),
    tree: function() {
      return this.$store.state.problems.konwledge;
    },
    menu: function() {
      return this.$store.state.problems.konwledgeMenu;
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