<template>
  <header class="header">
    <div class="header__left" @click="linkToHom">
      <img src="../assets/image/微信图片_20200331141547.jpg" alt="" />
      吴昌禄
    </div>
    <div class="header__right">
      <div class="search">
        <input type="text" />
        <i class="el-icon-search"></i>
      </div>
      <ul class="nav">
        <li v-for="(item, index) in navList" :key="index">
          {{ item.text }}<i v-if="item.icon" :class="item.icon"></i>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        {
          text: "博客",
          url: ""
        },
        {
          text: "开源项目",
          url: "",
          icon: "el-icon-share"
        },
        {
          text: "每周导读",
          url: ""
        },
        {
          text: "优质资源",
          url: ""
        }
      ]
    };
  },
  methods:{
      linkToHom(){
          this.$router.push({
              name:'index'
          })
      }
  }
};
</script>

<style lang="less" scoped>
.header {
  position: fixed;
  top: 0;
  width: 100vw;
  min-width: 960px;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 58px;
  height: 64px;
  white-space: nowrap;
  background: #fff;
  box-shadow: 0 8px 24px 2px rgba(0, 0, 0, 0.05);
  &__left {
    display: flex;
    align-items: center;
    font-size: 22px;
    img {
      margin-right: 10px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    cursor: pointer;
  }
  &__right {
    display: flex;
    .search {
      position: relative;
      input {
        width: 200px;
        height: 32px;
        padding: 0 38px 0 14px;
        color: #454d64;
        font-size: 14px;
        border: 0;
        outline: none;
        transition: all 0.2s;
        border-radius: 16px;
        background: #f5f6f8;
      }
      i {
          position: absolute;
          top: 8px;
          right: 12px;
      }
    }
    .nav {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #666;
      li {
        margin: 0 15px;
        cursor: pointer;
        &:hover {
          color: @primary;
        }
      }
    }
  }
}
</style>
