<template>
  <div class="person">
    <h1>个人中心</h1>
    <i-form style="padding-left:20px;margin-top:30px">
      <Form-item label="昵称">
        <i-input placeholder="请输入"
          v-model="userInfo.nickName"></i-input>
      </Form-item>
      <Form-item label="博客名">
        <i-input placeholder="请输入"
          v-model="userInfo.blockName"></i-input>
      </Form-item>
      <Form-item label="座右铭">
        <i-input placeholder="请输入"
          v-model="userInfo.motto"></i-input>
      </Form-item>
      <Form-item label="头像">
        <br />
        <img class="avator"
          :src="
            userInfo.avator ||
              'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=145692761,4091651670&fm=26&gp=0.jpg'
          "
          alt=""
          @click="avatorClick" />
      </Form-item>
      <Form-item>
        <i-button type="primary"
          size="large"
          @click="submitUserInfo">保存</i-button>
      </Form-item>
    </i-form>
    <input class="hide"
      type="file"
      accept="png,jpeg,jpg"
      ref="file"
      @change="fileChange" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { upload } from '../../assets/js/utils.js'
export default {
  data() {
    return {
      userInfo: {
        nickName: '',
        blockName: '',
        motto: '',
        avator: ''
      }
    }
  },
  computed: {
    ...mapGetters(['getUserid'])
  },
  methods: {
    avatorClick() {
      this.$refs.file.click()
    },
    async fileChange(e) {
      const file = e.target.files[0]
      e.target.value = ''
      const url = await upload(file)
      this.userInfo.avator = url
    },
    async submitUserInfo() {
      const url = 'users/updateUserInfo'
      const res = this.$axios.$post(
        url,
        Object.assign({ userid: this.getUserid }, this.userInfo)
      )
      console.log(res)
    }
  },
  mounted() {
    console.log(this.$store.state)
  },
  async asyncData({ store }) {
    let userInfo = {}
    ;({
      nick_name: userInfo.nickName,
      block_name: userInfo.blockName,
      motto: userInfo.motto,
      avator: userInfo.avator
    } = store.state.userInfo)
    return { userInfo }
  }
}
</script>

<style lang="less" scoped>
.person {
  .avator {
    margin-top: 20px;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 1px solid rgb(223, 223, 223);
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
  .hide {
    width: 0;
    height: 0;
    opacity: 0;
  }
}
</style>
