<template>
  <div class="block">
    <com-header></com-header>
    <aside class="block__aside">
      <nav class="nav">
        <ul v-for="(item, index) in navList" :key="index">
          <a>{{ item.title }}</a>
          <li
            :title="item.title"
            v-for="(child, childIndex) in item.children"
            :key="childIndex"
          >
            {{ child.title }}
          </li>
        </ul>
      </nav>
    </aside>
    <section class="block__content">
        <nuxt/>
    </section>
  </div>
</template>

<script>
import comHeader from "../components/header";
export default {
  components: {
    comHeader
  },
  data() {
    return {
      navList: [
        {
          title: "Node.js",
          children: [
            {
              title: "node进程",
              url: ""
            },
            {
              title: "node进程打算打开拉萨洪都拉斯肯定会拉萨撒",
              url: ""
            },
            {
              title: "node进程",
              url: ""
            }
          ]
        },
        {
          title: "Node.js",
          children: [
            {
              title: "node进程",
              url: ""
            },
            {
              title: "node进程",
              url: ""
            },
            {
              title: "node进程",
              url: ""
            }
          ]
        },
        {
          title: "Node.js",
          children: [
            {
              title: "node进程",
              url: ""
            },
            {
              title: "node进程",
              url: ""
            },
            {
              title: "node进程",
              url: ""
            }
          ]
        },
        {
          title: "Node.js",
          children: [
            {
              title: "node进程",
              url: ""
            },
            {
              title: "node进程打算打开拉萨洪都拉斯肯定会拉萨撒",
              url: ""
            },
            {
              title: "node进程",
              url: ""
            }
          ]
        },
        {
          title: "Node.js",
          children: [
            {
              title: "node进程",
              url: ""
            },
            {
              title: "node进程",
              url: ""
            },
            {
              title: "node进程",
              url: ""
            }
          ]
        },
        {
          title: "Node.js",
          children: [
            {
              title: "node进程",
              url: ""
            },
            {
              title: "node进程",
              url: ""
            },
            {
              title: "node进程",
              url: ""
            }
          ]
        },
        {
          title: "Node.js",
          children: [
            {
              title: "node进程",
              url: ""
            },
            {
              title: "node进程打算打开拉萨洪都拉斯肯定会拉萨撒",
              url: ""
            },
            {
              title: "node进程",
              url: ""
            }
          ]
        },
        {
          title: "Node.js",
          children: [
            {
              title: "node进程",
              url: ""
            },
            {
              title: "node进程",
              url: ""
            },
            {
              title: "node进程",
              url: ""
            }
          ]
        },
        {
          title: "Node.js",
          children: [
            {
              title: "node进程",
              url: ""
            },
            {
              title: "node进程",
              url: ""
            },
            {
              title: "node进程",
              url: ""
            }
          ]
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.block {
  padding-top: 65px;
  &__aside {
    position: fixed;
    z-index: 100;
    top: 65px;
    left: 0;
    bottom: 0;
    width: 260px;
    background-color: transparent;
    box-sizing: border-box;
    transition: left 0.3s;
    width: 300px;
    padding-top: 50px;
    border-right: 1px solid #ddd;
    .nav {
        height: 100%;
        overflow-y: auto;
        padding-bottom: 20px;
      ul {
        padding: 15px 24px 15px 58px;
        a {
          font-size: 18px;
        }
        li {
          font-size: 15px;
          padding: 10px 20px 0 10px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #444;
          cursor: pointer;
          &:hover {
            color: @primary;
          }
        }
      }
    }
  }
  &__content{
      margin-left: 300px;
  }
}
</style>
