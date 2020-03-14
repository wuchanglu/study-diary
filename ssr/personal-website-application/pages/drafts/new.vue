<template>
  <div class="mavonEditor">
    <i-form style="padding:20px 50px">
      <form-item label="标题">
        <i-input v-model="detail.title"
          placeholder="请输入标题"
          style=""></i-input>
      </form-item>
      <form-item label="简介">
        <i-input v-model="detail.introduce"
          placeholder="请输入简介"
          style=""
          type="textarea"></i-input>
      </form-item>
    </i-form>
    <i-button size="large"
      type="success"
      class="backButton"
      @click="back">返回</i-button>
    <no-ssr>
      <mavon-editor ref="markdown"
        style="height:100%"
        :toolbars="markdownOption"
        v-model="handbook"
        @save="saveButtonClick"
        @imgAdd="imgAdd"
        @imgDel="imgDel" />
    </no-ssr>
  </div>
</template>
<script>
import OSS from 'ali-oss'
export default {
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  data() {
    return {
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      handbook: '#### how to use mavonEditor in nuxt.js',
      detail: {
        title: '',
        introduce: ''
      }
    }
  },
  methods: {
    async getData() {
      const url = `http://192.168.16.108:3796/diary/detail?id=${
        this.$route.query.id
      }`
      const res = await this.$axios.$get(url)
      this.detail = res.data
      this.handbook = res.data.markdown
    },
    saveButtonClick(value, render) {
      this.$route.query.id
        ? this.update(value, render)
        : this.save(value, render)
    },
    async update(value, render) {
      const params = Object.assign({}, this.detail)
      params.id = params._id
      delete params._id
      params.markdown = value
      params.html = render
      const res = await this.$axios.$post(
        'http://192.168.16.108:3796/diary/update',
        params
      )
      if (res.state === 200) {
        this.$Message.success('编辑成功')
        this.$router.push({
          name: 'drafts-show',
          query: {
            id: params.id
          }
        })
      }
    },
    async save(value, render) {
      const params = Object.assign({}, this.detail)
      params.markdown = value
      params.html = render
      params.phone = this.userInfo.phone
      const res = await this.$axios.$post(
        'http://192.168.16.108:3796/diary/add',
        params
      )
      if (res.state === 200) {
        this.$Message.success('新增成功')
        this.$router.push({
          name: 'drafts-show',
          query: {
            id: res.id
          }
        })
      }
    },
    imgAdd(fileIndex, file) {
      const path = `${+new Date()}-${file.name}`
      let client = new OSS({
        region: 'oss-cn-hangzhou',
        accessKeyId: 'LTAI4Fu1Tpw8RmLMnFbwj1pR',
        accessKeySecret: '3QjgdQLwUT5a9Qdefn0UJAuJ3azFUR',
        bucket: 'wcl-bucket'
      })
      //   使用上传对象的put方式，参数为路径名和文件对象
      client
        .put(path, file)
        .then(res => {
          if (res.url) {
            this.$refs.markdown.$img2Url(fileIndex, res.url)
          }
        })
        .catch(err => {
          err
        })
    },
    imgDel(index) {
      // console.log(this.$refs.markdown.$img3Url[index])
    },
    back() {
      this.$router.go(-1)
    }
  },
  created() {
    if (this.$route.query.id) {
      this.getData()
    }
  },
  mounted() {
    if (sessionStorage.getItem('userInfo')) {
      this.$store.commit(
        'setUserInfo',
        JSON.parse(sessionStorage.getItem('userInfo'))
      )
    }
  }
}
</script>

<style scoped lang="less">
.mavonEditor {
  width: 100%;
  height: 100%;
  .backButton {
    position: fixed;
    z-index: 1501;
    bottom: 100px;
    right: 50px;
  }
}
</style>
