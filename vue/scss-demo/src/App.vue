<template>
  <div id="app">
    <!-- <signature></signature> -->
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import signature from "./components/signature"
// import HelloWorld from "./components/HelloWorld.vue";
import mixins from "./mixins/index";
export default {
  name: "app",
  mixins: [mixins],
  components: {
    // HelloWorld,
    signature
  },
  created() {},
  mounted() {
  }
};
</script>

<style>
*{
  margin: 0;
  padding: 0;
  text-align: left;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
