<template>
  <div class="layout">
    <Row type="flex">
      <i-col span="5"
        class="layout-menu-left">
        <Menu theme="dark"
          width="auto"
          style="overflow: hidden;"
          ref="menu"
          :active-name="activeName"
          @on-select="menuSelect">
          <div class="layout-logo-left"></div>
          <Menu-item name="person"
            key="person">
            <Icon type="ios-home"></Icon>
            个人中心
          </Menu-item>
          <Menu-item name="block"
            key="block">
            <Icon type="ios-book"></Icon>
            博客管理
          </Menu-item>
          <Menu-item name="draft"
            key="draft">
            <Icon type="ios-nutrition"></Icon>
            编写文章
          </Menu-item>
        </Menu>
      </i-col>
      <i-col span="19"
        height="100%"
        style="display:flex;flex-direction: column;">
        <div class="layout-header"></div>
        <div class="layout-breadcrumb">
          <Breadcrumb>
            <Breadcrumb-item href="#">首页</Breadcrumb-item>
            <Breadcrumb-item href="#">应用中心</Breadcrumb-item>
            <Breadcrumb-item>某应用</Breadcrumb-item>
          </Breadcrumb>
        </div>
        <div class="layout-content">
          <div class="layout-content-main">
            <nuxt />
          </div>
        </div>
        <div class="layout-copy">
          2011-2016 &copy; TalkingData
        </div>
      </i-col>
    </Row>
  </div>
</template>
<script>
// import {mapMutations}
export default {
  data() {
    return {
      activeName: '',
      routerNameData: {
        block: 'home-block',
        person: 'home-person',
        draft: 'home-draft'
      }
    }
  },
  methods: {
    menuSelect(data) {
      this.$router.push({
        name: this.routerNameData[data]
      })
    }
  },
  mounted() {
    this.activeName = this.$route.name.replace("home-","")
    this.$nextTick(() => {
      this.$refs.menu.updateActiveName()
      // .updateactiveName()
    })
  },
  async asyncData(params) {
    // if (query.key) {
    //   return {
    //     activeName: req.url.replace('/home/', '')
    //   }
    // } else {
    // }
  }
}
</script>
<style lang="less" scoped>
.layout {
  background: #f5f7f9;
  position: relative;
  height: 100vh;
  box-sizing: border-box;
}
.layout-breadcrumb {
  padding: 10px 15px 0;
}
.layout-content {
  flex: 1;
  min-height: 200px;
  max-height: calc(100vh - 169px);
  margin: 15px 15px 63px 15px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
  overflow-y: auto;
}
.layout-content-main {
  padding: 20px;
}
.layout-copy {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}
.layout-menu-left {
  background: #464c5b;
  height: 100vh;
}
.layout-header {
  height: 60px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #ff0;
  border-radius: 3px;
  margin: 15px auto;
}
</style>