<template>
  <div>{{ test }}</div>
</template>

<script>
export default {
  data() {
    return {
      test: ""
    };
  },
  async asyncData({ params }) {
    console.log(params);
    const data = await new Promise((resolve, rject) => {
      resolve(params.test + "he he");
    });
    return { test: data };
  }
};
</script>

<style></style>
