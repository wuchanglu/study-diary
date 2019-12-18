export default {
  data() {
    return {
      page: {
        current: 1,
        total: 0,
        size: 10
      },
      dom: window,
      limit: 200,
      isLoading: false,
      websocket: {
        shouldOpen: false,
        url: "",
        target: "",
        needOpen: false,
        key: ""
      },
      socketDoing: {
        203: res => {
          console.log(res);
        }
      }
    };
  },
  methods: {
    openSocket() {
      if (this.websocket.shouldOpen) {
        this.websocket.target = new WebSocket(this.websocket.url);
        this.websocket.target.onopen = this.socketOpen;
        this.websocket.target.onmessage = this.socketMessage;
        this.websocket.target.onclose = this.socketClose;
      }
    },
    socketOpen(res) {
      console.log(res);
      return res;
    },
    socketMessage(res) {
      const data = JSON.parse(res.data);
      this.socketDoing[data.key](data);
    },
    socketClose(res) {
      if (this.websocket.needOpen) {
        setTimeout(() => {
          this.openSocket();
        }, 5000);
      } else {
        this.websocket.target = "";
      }
      return res;
    },
    copy() {
      const tag = document.createElement("input");
      tag.setAttribute("id", "cp_hgz_input");
      tag.value = this.link;
      document.getElementsByTagName("body")[0].appendChild(tag);
      document.getElementById("cp_hgz_input").select();
      document.execCommand("copy");
      document.getElementById("cp_hgz_input").remove();
    },
    pageChange(current) {
      this.page.current = current;
      this.getList();
    },
    getList() {},
    domScroll() {
      const wScrollY =
        this.dom === window ? this.dom.scrollY : this.dom.scrollTop; // 当前滚动条top值
      const wInnerH =
        this.dom === window ? this.dom.innerHeight : this.dom.offsetHeight; // 设备窗口的高度
      const bScrollH =
        this.dom === window
          ? document.body.scrollHeight
          : this.dom.scrollHeight; // body总高度
      if (wScrollY + wInnerH >= bScrollH - this.limit && !this.isLoading) {
        console.log("到底啦");
        this.page.current++;
        this.getList();
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.getList();
      this.openSocket();
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.dom.addEventListener("scroll", this.domScroll);
    });
  },
  destroyed() {
    this.dom.removeEventListener(this.domScroll);
  }
};
