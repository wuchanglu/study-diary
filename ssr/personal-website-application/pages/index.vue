<template>
  <div class="container">
    {{ name }}
    {{ message }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      message: "独家试爱回到家撒扩大和凯撒较大"
    };
  },
  components: {
  },
  created() {},
  asyncData() {
    return new Promise(resolve => {
      resolve();
    }).then(res => {
      return {name:"this is my application"}
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
