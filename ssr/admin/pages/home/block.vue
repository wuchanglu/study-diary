<template>
  <div class="block">
    <h1>博客管理</h1>
    <Collapse>
      <Panel
        style="position:relative"
        v-for="(item, index) in list"
        :key="index"
      >
        {{ item.title }}
        <div class="operation">
          <i-button @click.stop="addArticle(item)" size="small" type="primary"
            >新增文章</i-button
          >
          <i-button @click.stop="editClassify(item)" size="small" type="warning"
            >编辑分类</i-button
          >
          <i-button @click.stop="delClassify(item)" size="small" type="error"
            >删除分类</i-button
          >
        </div>
        <div slot="content">
          <Collapse>
            <Panel
              style="position:relative"
              v-for="(child, childIndex) in item.children"
              :key="childIndex"
            >
              {{ child.title }}
              <div class="child__operation">
                <i-button
                  @click.stop="editArticle(child)"
                  size="small"
                  type="warning"
                  >编辑文章</i-button
                >
                <i-button
                  @click.stop="delArticle(child)"
                  size="small"
                  type="error"
                  >删除文章</i-button
                >
              </div>
              <p slot="content">{{ child.introduce }}</p>
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
          title: "Node.js",
          tagId: "aa",
          children: [
            {
              title: "文章标题",
              addTime: "",
              updateTime: "",
              introduce: "我这里是文章的介绍，哈哈哈哈哈",
              content: ""
            },
            {
              title: "文章标题",
              addTime: "",
              updateTime: "",
              introduce: "我这里是文章的介绍，哈哈哈哈哈",
              content: ""
            }
          ]
        },
        {
          title: "Node.js",
          tagId: "aa",
          children: [
            {
              title: "文章标题",
              addTime: "",
              updateTime: "",
              introduce: "我这里是文章的介绍，哈哈哈哈哈",
              content: ""
            },
            {
              title: "文章标题",
              addTime: "",
              updateTime: "",
              introduce: "我这里是文章的介绍，哈哈哈哈哈",
              content: ""
            }
          ]
        }
      ]
    };
  },
  methods: {
    addArticle(data) {
      this.$router.push({
        name: "home-draft"
      });
    },
    editClassify(data) {},
    delClassify(data) {
      this.$Modal.confirm({
        title: "确认",
        content: "确认删除该分类吗(删除分类会删除对应分类下的文章)",
        onOk: () => {
          this.$Message.info("点击了确定");
        },
        onCancel: () => {
          this.$Message.info("点击了取消");
        }
      });
    },
    editArticle(data) {
      this.$router.push({
        name: "home-draft",
        query: { id: data.articleid }
      });
    },
    delArticle(data) {
      this.$Modal.confirm({
        title: "确认",
        content: "确认删除该文章吗？",
        onOk: () => {
          this.$Message.info("点击了确定");
        },
        onCancel: () => {
          this.$Message.info("点击了取消");
        }
      });
    }
  }
};
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
