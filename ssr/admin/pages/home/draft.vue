<template>
  <div class="mavonEditor">
    <i-form style="padding:10px 0">
      <form-item style="text-align:right">
        <i-button type="primary"
          class="backButton"
          @click="back">返回</i-button>
        <i-button type="success"
          class="backButton"
          @click="saveButtonClick">保存</i-button>
      </form-item>
      <form-item label="标题"
        :label-width="80">
        <i-input v-model="detail.title"
          placeholder="请输入标题"
          style=""></i-input>
      </form-item>
      <form-item label="简介"
        :label-width="80">
        <i-input v-model="detail.introduce"
          placeholder="请输入简介"
          style=""
          type="textarea"></i-input>
      </form-item>
    </i-form>
    <client-only>
      <mavon-editor ref="markdown"
        style="height:550px"
        :toolbars="markdownOption"
        v-model="handbook"
        @save="saveButtonClick"
        @imgAdd="imgAdd"
        @imgDel="imgDel"></mavon-editor>
    </client-only>
  </div>
</template>
<script>
import { upload } from '../../assets/js/utils.js'

export default {
  computed: {},
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
    async getData() {},
    saveButtonClick(value, render) {},
    async update(value, render) {},
    async save(value, render) {},
    async imgAdd(fileIndex, file) {
      const url = await upload(file)
      this.$refs.markdown.$img2Url(fileIndex, url)
    },
    imgDel(index) {
      // console.log(this.$refs.markdown.$img3Url[index])
    },
    back() {}
  },
  created() {},
  mounted() {}
}
</script>

<style scoped lang="less">
.mavonEditor {
  width: 100%;
  height: 100%;
  .backButton {
  }
}
</style>
