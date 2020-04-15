<template>
  <div class="block">
    <com-header></com-header>
    <aside class="block__aside">
      <nav class="nav">
        <ul v-for="(item, index) in navList"
          :key="index">
          <a>{{ item.name }}</a>
          <li :title="item.name"
            v-for="(child, childIndex) in item.children"
            :key="childIndex"
            @click="ariticalClick(child)">
            {{ child.title }}
          </li>
        </ul>
      </nav>
    </aside>
    <section class="block__content">
      <div class="show markdown-body"
        v-html="aritical"></div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import comHeader from '@/components/header'
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
  components: {
    comHeader
  },
  data() {
    return {
      navList: [],
      aritical: ''
    }
  },
  computed: {
    ...mapGetters(['getUserInfo'])
  },
  methods: {
    ariticalClick(data) {
      this.aritical = data.html
    }
  },
  async asyncData({ params, store, $axios }) {
    const res = await $axios.$get(`diary/type/list?userid=${params.block}`)
    let aritical = ''
    res.list.some(item => {
      if (item.children) {
        aritical = item.children[0].html
        return true
      }
    })
    return { navList: res.list, aritical }
  }
}
</script>

<style lang="less" scoped>
.block {
  padding-top: 65px;
  &__aside {
    position: fixed;
    z-index: 100;
    top: 65px;
    left: 0;
    bottom: 0;
    width: 260px;
    background-color: transparent;
    box-sizing: border-box;
    transition: left 0.3s;
    width: 300px;
    padding-top: 50px;
    border-right: 1px solid #ddd;
    .nav {
      height: 100%;
      overflow-y: auto;
      padding-bottom: 20px;
      ul {
        padding: 15px 24px 15px 58px;
        a {
          font-size: 18px;
        }
        li {
          font-size: 15px;
          padding: 10px 20px 0 10px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #444;
          cursor: pointer;
          &:hover {
            color: @primary;
          }
        }
      }
    }
  }
  &__content {
    margin-left: 300px;
    .show {
      margin: 35px 50px;
      width: 1200px;
    }
  }
}
</style>
