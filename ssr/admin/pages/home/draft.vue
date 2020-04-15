<template>
  <div class="mavonEditor">
    <i-form style="padding:10px 0">
      <form-item label="类型"
        :label-width="80">
        <div class="operaiton">
          <Select v-model="typeid"
            style="width:350px">
            <Option v-for="item in typeList"
              :value="item._id"
              :key="item._id">{{ item.name }}</Option>
          </Select>
          <div class="button-wrapper">
            <i-button type="primary"
              class="backButton"
              @click="back">返回</i-button>
            <i-button type="success"
              class="backButton"
              @click="saveButtonClick">保存</i-button>
          </div>
        </div>
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
        v-model="detail.markdown"
        @change="change"
        @imgAdd="imgAdd"
        @imgDel="imgDel"></mavon-editor>
    </client-only>
  </div>
</template>
<script>
import { upload } from '../../assets/js/utils.js'
import { mapGetters } from 'vuex'
export default {
  computed: {},
  data() {
    return {
      typeid: this.$route.query.typeid,
      typeList: [
        {
          name: 'aa',
          _id: 'asdhgasidhsa'
        }
      ],
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
        introduce: '',
        html: '',
        markdown: ''
      }
    }
  },
  computed: {
    ...mapGetters(['getUserid'])
  },
  methods: {
    async getData() {},
    change(value, render) {
      this.detail.html = render
      this.detail.markdown = value
    },
    saveButtonClick() {
      if (!this.typeid) {
        this.$Message.warning('请选择类型')
        return
      }
      if (!this.detail.title) {
        this.$Message.warning('请输入标题')
        return
      }
      if (!this.detail.introduce) {
        this.$Message.warning('请输入简介')
        return
      }
      if (!this.detail.html) {
        this.$Message.warning('请输入内容')
        return
      }
      if (!this.detail.userid) {
        this.save()
      } else {
        this.update()
      }
    },
    async update(value, render) {
      let params = {
        title: this.detail.title,
        introduce: this.detail.introduce,
        html: this.detail.html,
        markdown: this.detail.markdown,
        userid: this.getUserid,
        typeid: this.typeid,
        id: this.detail._id
      }
      const res = await this.$axios.$post('diary/update', params)
      if (res.state === 200) {
        this.$Message.success('更新成功')
      }
    },
    async save(value, render) {
      let params = {
        title: this.detail.title,
        introduce: this.detail.introduce,
        html: this.detail.html,
        markdown: this.detail.markdown,
        userid: this.getUserid,
        typeid: this.typeid
      }
      const res = await this.$axios.$post('diary/add', params)
      if (res.state === 200) {
        this.$Message.success('保存成功')
        this.$router.push({
          query: {
            typeid: this.typeid,
            id: res.id
          }
        })
      }
    },
    async imgAdd(fileIndex, file) {
      const url = await upload(file)
      this.$refs.markdown.$img2Url(fileIndex, url)
    },
    imgDel(index) {},
    back() {
      this.$router.go(-1)
    }
  },
  created() {},
  mounted() {},
  async asyncData({ route, $axios, store }) {
    let returnData = {}
    const res = await $axios.$get(
      `diary/type/list?userid=${store.state.userid}&limit=true`
    )
    returnData.typeList = res.state === 200 ? res.list : []
    returnData.typeid = route.query.typeid
    if (route.query.id) {
      const res = await $axios.get(`diary/detail?id=${route.query.id}`)
      returnData.detail =
        res.data.state === 200
          ? res.data.data
          : {
              title: '',
              introduce: '',
              html: '',
              markdown: ''
            }
    }
    return returnData
  }
}
</script>

<style scoped lang="less">
.mavonEditor {
  width: 100%;
  height: 100%;
  .backButton {
  }
  .operaiton {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
