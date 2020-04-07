<template>
  <div class="block">
    <h1>博客管理</h1>
    <Collapse>
      <Panel style="position:relative"
        v-for="(item,index) in list"
        :key="index">
        {{item.title}}
        <div class="operation">
          <i-button size="small"
            type="primary">新增文章</i-button>
          <i-button size="small"
            type="warning">编辑分类</i-button>
          <i-button size="small"
            type="error">删除分类</i-button>
        </div>
        <div slot="content">
          <Collapse>
            <Panel style="position:relative"
              v-for="(child,childIndex) in item.children"
              :key="childIndex">
              {{child.title}}
              <div class="child__operation">
                <i-button size="small"
                  type="warning">编辑文章</i-button>
                <i-button size="small"
                  type="error">删除文章</i-button>
              </div>
              <p slot="content">{{child.introduce}}</p>
            </Panel>
          </Collapse>
        </div>
      </Panel>
    </Collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          title: 'Node.js',
          tagId: 'aa',
          children: [
            {
              title: '文章标题',
              addTime: '',
              updateTime: '',
              introduce: '我这里是文章的介绍，哈哈哈哈哈',
              content: ''
            },
            {
              title: '文章标题',
              addTime: '',
              updateTime: '',
              introduce: '我这里是文章的介绍，哈哈哈哈哈',
              content: ''
            }
          ]
        },
        {
          title: 'Node.js',
          tagId: 'aa',
          children: [
            {
              title: '文章标题',
              addTime: '',
              updateTime: '',
              introduce: '我这里是文章的介绍，哈哈哈哈哈',
              content: ''
            },
            {
              title: '文章标题',
              addTime: '',
              updateTime: '',
              introduce: '我这里是文章的介绍，哈哈哈哈哈',
              content: ''
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="less">
.block {
  .operation,
  .child__operation {
    position: absolute;
    right: 30px;
    top: -2px;
  }
}
</style>

