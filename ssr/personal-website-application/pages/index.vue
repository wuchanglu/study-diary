<template>
  <div class="container">
    {{ name }}
    {{ message }}
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
export default {
  data() {
    return {
      name: "",
      message: "独家试爱回到家撒扩大和凯撒较大"
    };
  },
  components: {
    Logo
  },
  created() {
    new Promise(resolve => {
      resolve();
    }).then(res => {
      this.name = "this is my application";
    });
  }
};
</script>

<style lang="less" scoped>
@base: #f938ab;
.container {
  color: @base;
}
</style>
