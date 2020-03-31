<template>
  <div class="page">
    <com-header></com-header>
    <section class="page__message">
      <h1 class="message__title">吴昌禄的博客</h1>
      <p class="message__motto">座右铭</p>
      <button class="message__button">getStarted</button>
    </section>
    <section class="page__feature">
      <div
        class="feature__block"
        v-for="(item, index) in featureList"
        :key="index"
      >
        <img :src="item.pic" alt="" />
        <p>{{ item.name }}</p>
        <label>{{ item.label }}</label>
      </div>
    </section>
    <footer>created by 十三先生</footer>
  </div>
</template>

<script>
import comHeader from "../components/header";
export default {
  components: { comHeader },
  data() {
    return {
      title: "",
      featureList: [
        {
          pic: require("../assets/image/box.png"),
          name: "精品博客",
          label: "持续输出中..."
        },
        {
          pic: require("../assets/image/roket.png"),
          name: "开源项目",
          label: "打造职业核心竞争力"
        },
        {
          pic: require("../assets/image/k7bjsocq_w144_h144.png"),
          name: "每周导读",
          label: "实时更新前沿精品文章导读"
        }
      ]
    };
  },
  async asyncData({ req }) {
    console.log(req);
    const data = await new Promise((resolve, rject) => {
      resolve("he he");
    });
    return { title: data };
  }
};
</script>

<style lang="less" scoped>
// @import "../assets/style/index.less";
.page {
  padding-top: 65px;
  width: 100vw;
  min-height: 100vh;
  min-width: 960px;
  &__header {
  }
  &__message {
    margin: 0;
    padding: 100px 0;
    text-align: center;
    background-color: #f5f6f8;
    .message {
      &__title {
        margin: 0 0 16px;
        font-size: 48px;
        font-weight: 600;
        line-height: 56px;
        color: #080e29;
      }
      &__motto {
        margin: 16px 0 32px;
        font-size: 16px;
        line-height: 24px;
        color: #717484;
      }
      &__button {
        box-sizing: border-box;
        margin-right: 0;
        color: #fff;
        background: #4569d4;
        width: 140px;
        height: 40px;
        line-height: 40px;
        border: none;
        border-radius: 20px;
        box-shadow: 1px 1px 5px 2px #4569d4;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
  &__feature {
    display: flex;
    justify-content: space-between;
    margin-left: auto;
    margin-right: auto;
    width: 960px;
    padding: 72px 0 150px 0;
    border-bottom: 1px solid #dddddd;
    .feature__block {
      text-align: center;
      p {
        padding: 5px;
      }
      img {
        margin: 10px;
        height: 40px;
      }
      label {
        font-size: 14px;
        color: #999;
        padding: 5px;
      }
    }
  }
  footer{
    margin: 40px 0;
    color: #999;
    text-align: center;
  }
}
</style>
