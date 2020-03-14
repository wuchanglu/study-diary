<template>
  <div class="my">
    <i-button size="large"
      @click="writeNew">新增</i-button>
    <Collapse v-if="list.length">
      <Panel v-for="(item,index) in list"
        :key="index+1">
        <span class="title">{{item.title}}</span>
        ----- {{item.addTime}}
        <i-button size="small"
          type="primary"
          @click="edit(item)">
          编辑
        </i-button>
        <i-button size="small"
          type="success"
          @click="watch(item)">查看详情</i-button>
        <div class="item"
          slot='content'>
          <p class="item-time"></p>
          <p class="item-itroduce">{{item.introduce}}</p>
        </div>
      </Panel>
    </Collapse>
  </div>
</template>

<script>
export default {
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  data() {
    return {
      list: []
    }
  },
  methods: {
    writeNew() {
      this.$router.push({
        name: 'drafts-new'
      })
    },
    edit(item) {
      this.$router.push({
        name: 'drafts-new',
        query: { id: item._id }
      })
    },
    watch(item) {
      this.$router.push({
        name: 'drafts-show',
        query: { id: item._id }
      })
    },
    async getList() {
      const url = `http://192.168.16.108:3796/diary/list?phone=${
        this.userInfo.phone
      }`
      const res = await this.$axios.$get(url)
      this.list = res.list.map(item => {
        const date = new Date(Number(item.addTime))
        item.addTime = `${date.getFullYear()}-${date.getMonth() +
          1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
        return item
      })
    }
  },
  created() {},
  mounted() {
    if (sessionStorage.getItem('userInfo')) {
      this.$store.commit(
        'setUserInfo',
        JSON.parse(sessionStorage.getItem('userInfo'))
      )
    }
    this.getList()
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/index.less';
.my {
  margin: 20px auto;
  width: 1100px;
  padding: 20px 30px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0px 2px 10px 0 #999;
  .title {
    margin-right: 30px;
    color: @title-color;
  }
  .item {
    &__time {
      color: @primary;
      font-size: 14px;
    }
    &__itroduce {
      color: @content-color;
      font-size: 16px;
    }
  }
}
</style>

