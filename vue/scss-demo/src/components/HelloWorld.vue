<template>
  <div class="hello">
    <div class="hello__logo"></div>
    <ul class="hello__extend">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
    </ul>
    <div class="hello__first" style="margin-bottom:50px">
      <div class="first__top">
        <div class="top__left"></div>
        <div class="top__right"></div>
      </div>
      <div class="first__bottom"></div>
    </div>
    <div class="hello__second">
      <div class="second__top">
        <div class="top__left"></div>
        <div class="top__right"></div>
      </div>
      <div class="second__bottom"></div>
    </div>
    <p class="hello__mix">mix</p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../style/index.scss";
ul li {
  list-style: none;
}
.hello {
  margin: 0 auto;
  width: 90vw;
  height: 100vh;
  background: $color-background;
  &__logo {
    width: 50px;
    height: 50px;
    // background: url($icon-logo);
    @include icon($icon-logo);
  }
  &__extend {
    @extend .flex-x;
    li {
      margin-right: 10px;
      padding: 10px;
      color: $color-warning;
      background: $color-primary;
    }
  }
  @include layout("first");
  @include layout(second);
  &__mix{
    color: $color-mix ;
  }
}
</style>
