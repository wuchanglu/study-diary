<template>
  <div>
    <h1 class="show">标题： {{detail.title}}</h1>
    <h2 class="show">简介：{{detail.introduce}}</h2>
    <i-button size="large"
      type="success"
      class="backButton"
      @click="back">返回</i-button>
    <div class="show markdown-body"
      v-html="detail.html"></div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.9.0/github-markdown.min.css'
        }
      ]
    }
  },
  data() {
    return {
      html: '',
      detail: {}
    }
  },
  methods: {
    async getData() {
      const url = `http://192.168.16.108:3796/diary/detail?id=${
        this.$route.query.id
      }`
      const res = await this.$axios.$get(url)
      this.detail = res.data
    },
    back() {
      this.$router.go(-1)
    }
  },
  created() {
    if (this.$route.query.id) {
      this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
.show {
  margin: 50px auto;
  padding: 8px 25px 15px 25px;
  width: 800px;
  background-color: rgb(251, 251, 251);
}
.backButton {
  position: fixed;
  bottom: 100px;
  right: 50px;
}
</style>