<template>
  <div class="show markdown-body" v-html="html"></div>
</template>

<script>
export default {
//   head() {
//     return {
//       link: [
//         {
//           rel: "stylesheet",
//           href: "@/assets/css/markdown.css"
//         }
//       ]
//     };
//   },
  data() {
    return {
      html: ""
    };
  },
  created() {
    try {
      this.html = JSON.parse(localStorage.getItem("draft")).html;
    } catch (error) {}
  }
};
</script>

<style lang="less" scoped>
.show {
  margin: 50px auto;
  padding: 8px 25px 15px 25px;
  width: 800px;
  background-color: rgb(251, 251, 251);
}
</style>
