<template>
  <div class="wrapper">
    <p class="wrapper__title">用户注册</p>
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
        @click="submit">提交</Button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Cookies from 'js-cookie'
export default {
  computed: {
    userInfo() {
      return {}
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
      const url = `users/registe`
      const res = await this.$axios.$post(url, {
        phone: this.formCustom.phone,
        password: this.formCustom.password
      })
      if (res.state === 200) {
        this.$Message.success('注册成功，即将跳转页面!')
        setTimeout(() => {
          this.$router.push({
            name: 'index'
          })
        }, 500)
      } else {
        this.$Message.error('注册失败')
      }
    }
  },
  created() {}
}
</script>

<style lang="less" scoped>
.wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 400px;
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
