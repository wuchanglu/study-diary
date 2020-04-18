<template>
  <div class="block">
    <h1>博客管理 <i-button @click="addType"
        size="small"
        type="primary">新增类型</i-button>
    </h1>
    <Collapse>
      <Panel style="position:relative"
        v-for="(item) in list"
        :key="item._id">
        {{ item.name }}
        <div class="operation">
          <i-button @click.stop="addArticle(item)"
            size="small"
            type="primary">新增文章</i-button>
          <i-button @click.stop="editClassify(item)"
            size="small"
            type="warning">编辑分类</i-button>
          <i-button @click.stop="delClassify(item)"
            size="small"
            type="error">删除分类</i-button>
        </div>
        <div slot="content">
          <p v-if="!item.children.length">暂无数据</p>
          <Collapse v-else>
            <Panel style="position:relative"
              v-for="(child, childIndex) in item.children"
              :key="childIndex">
              {{ child.title }}
              <div class="child__operation">
                <i-button @click.stop="editArticle(child)"
                  size="small"
                  type="warning">编辑文章</i-button>
                <i-button @click.stop="delArticle(child)"
                  size="small"
                  type="error">删除文章</i-button>
              </div>
              <p slot="content">{{ child.introduce }}</p>
            </Panel>
          </Collapse>
        </div>
      </Panel>
    </Collapse>
    <Modal v-model="isModalShow"
      :title="checkedType.userid?'新增分类':'编辑分类'"
      @on-ok="ok"
      @on-cancel="cancel">
      <Input v-model="checkedType.name"
        placeholder="请输入分类名" />
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      isModalShow: false,
      checkedType: {
        name: ''
      },
      list: []
    }
  },
  computed: {
    ...mapGetters(['getUserid'])
  },
  methods: {
    async ok() {
      const params = {
        userid: this.getUserid,
        name: this.checkedType.name
      }
      if (this.checkedType.userid) {
        params.id = this.checkedType._id
      }
      const res = await this.$axios.$post(
        this.checkedType.userid ? 'diary/type/update' : '/diary/type/add',
        params
      )
      console.log(res)
      if (res.state === 200) {
        this.$Message.success(
          this.checkedType.userid ? '编辑分类成功' : '新增分类成功'
        )
        this.getList()
      }
    },
    cancel() {},
    addType() {
      this.isModalShow = true
    },
    addArticle(data) {
      this.$router.push({
        name: 'home-draft',
        query: {
          typeid: data._id
        }
      })
    },
    editClassify(data) {
      this.checkedType = JSON.parse(JSON.stringify(data))
      this.isModalShow = true
    },
    delClassify(data) {
      this.$Modal.confirm({
        title: '确认',
        content: '确认删除该分类吗(删除分类会删除对应分类下的文章)',
        onOk: async () => {
          let res = await this.$axios.post('diary/type/del', { id: data._id })
          res = res.data
          this.$Message[res.state === 200 ? 'success' : 'error'](res.message)
          res.state === 200 ? this.getList() : ''
        },
        onCancel: () => {
          this.$Message.info('点击了取消')
        }
      })
    },
    editArticle(data) {
      this.$router.push({
        name: 'home-draft',
        query: { id: data._id, typeid: data.typeid }
      })
    },
    delArticle(data) {
      this.$Modal.confirm({
        title: '确认',
        content: '确认删除该文章吗？',
        onOk: async () => {
          let res = await this.$axios.post('diary/del', { id: data._id })
          res = res.data
          this.$Message[res.state === 200 ? 'success' : 'error'](res.message)
          res.state === 200 ? this.getList() : ''
        },
        onCancel: () => {
          this.$Message.info('点击了取消')
        }
      })
    },
    async getList() {
      let url = `diary/type/list?userid=${this.getUserid}`
      let res = await this.$axios.$get(url)
      res.list.forEach(item => {
        item.children = item.children || []
      })
      this.list = res.list
    }
  },
  async asyncData({ store, $axios }) {
    let url = `diary/type/list?userid=${store.state.userid}`
    let res = await $axios.$get(url)
    res.list.forEach(item => {
      item.children = item.children || []
    })
    return { list: res.list }
  }
}
</script>

<style lang="less">
.block {
  & > h1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .operation,
  .child__operation {
    position: absolute;
    right: 30px;
    top: -2px;
  }
}
</style>
