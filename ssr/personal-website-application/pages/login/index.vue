<template>
  <div class="wrapper">
    <p class="wrapper__title">用户登录</p>
    <div class="wrapper__form">
      <Form ref="form"
        :model="formCustom"
        :label-width="80"
        :rules="ruleCustom">
        <FormItem label="手机号:"
          prop="phone">
          <Input prefix="md-phone-portrait"
            placeholder="请输入手机号"
            size="large"
            type="tel"
            clearable
            v-model="formCustom.phone" />
        </FormItem>
        <FormItem label="密码:"
          prop="password">
          <Input prefix="md-lock"
            placeholder="请输入密码"
            size="large"
            type="password"
            clearable
            v-model="formCustom.password" /></FormItem>
      </Form>
      <div class="border"></div>
      <Button long
        type="primary"
        size="large"
        @click="submit">登录</Button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号!'))
      }
      const reg = /^((\+|00)86)?1([358][0-9]|4[579]|6[67]|7[01235678]|9[189])[0-9]{8}$/
      if (!reg.test(value)) {
        callback(new Error('请输入正确的手机号!'))
      }
      callback()
    }
    const validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码!'))
      }
      callback()
    }
    return {
      formCustom: {
        phone: '',
        password: ''
      },
      ruleCustom: {
        password: [{ validator: validatePass, trigger: 'blur' }],
        phone: [{ validator: validatePhone, trigger: 'blur' }]
      }
    }
  },
  methods: {
    async submit() {
      const can = await this.$refs.form.validate()
      if (!can) {
        return false
      }
      const url = `http://192.168.16.108:3796/users/login?phone=${
        this.formCustom.phone
      }&password=${this.formCustom.password}`
      const res = await this.$axios.$get(url)
      if (res.code !== 200) {
        this.$Message.error('账号密码错误')
        return false
      }
      this.$store.commit('setUserInfo', res.userInfo)
      this.$Message.success('登录成功!')
      this.$router.push({
        name: 'my'
      })
    }
  },
  created() {
    console.log(this.userInfo)
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  margin-top: -69px;
  text-align: center;
  &__title {
    padding-bottom: 33px;
    font-family: PingFangSC-Semibold;
    font-size: 24px;
    color: #1b3b90;
  }
  &__form {
    padding: 52px 30px 30px 30px;
    width: 400px;
    background: #ffffff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
  .border {
    margin: 20px -30px;
    width: 400px;
    border-top: 1px solid #e5e5e5;
  }
}
</style>
