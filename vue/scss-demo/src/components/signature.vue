<template>
  <div>
    <canvas
      class="signature"
      ref="canvas"
      :style="{
        width: `${width}px`,
        height: `${height}px`,
        background: `${background}`
      }"
      @mouseout="end"
      @mousemove="move"
      @mousedown="start"
      @mouseup="end"
      @touchmove="move"
      @touchstart="start"
      @touchend="end"
    ></canvas>
  </div>
</template>

<script>
export default {
  props: {
    background: { type: String, default: "#fff" },
    width: { type: Number, default: 600 },
    height: { type: Number, default: 500 },
    strokeStyle: { type: String, default: "#000" },
    lineWidth: { type: Number, default: 1 },
    lineCap: { type: String, default: "round" }
  },
  data() {
    return {
      isTouching: false,
      canvas: undefined,
      isLoading: false,
      startPosition: { x: 0, y: 0 },
      endPosition: { x: 0, y: 0 }
    };
  },
  methods: {
    //   确认，返回图片src
    sure() {
      this.imgSrc = this.$refs.canvas.toDataURL("image/png");
      return this.$refs.canvas.toDataURL("image/png");
    },
    // 取消
    cancel() {
      this.canvas.clearRect(0, 0, 300, 150);
      this.canvas.beginPath();
    },
    move(e) {
      if (!this.isTouching) return;
      const position = this.getPosition(e);
      console.log(position, this.startPosition);
      this.canvas.moveTo(
        this.startPosition.x * (300 / this.width),
        this.startPosition.y * (150 / this.height)
      );
      this.canvas.lineTo(
        position.x * (300 / this.width),
        position.y * (150 / this.height)
      );
      this.canvas.stroke();
      this.startPosition = position;
    },
    start(e) {
      this.isTouching = true;
      const position = this.getPosition(e);
      this.startPosition = position;
      this.canvas.moveTo(
        this.startPosition.x * (300 / this.width),
        this.startPosition.y * (150 / this.height)
      );
      console.log(this.startPosition);
    },
    end() {
      this.isTouching = false;
      console.log("end");
    },
    getPosition(e) {
      if (e.offsetX || e.offsetY) {
        return { x: e.offsetX, y: e.offsetY };
      } else {
        const touch = e.touches[0];
        const elPosition = this.$refs.canvas.getBoundingClientRect();
        return {
          x: touch.clientX - elPosition.left,
          y: touch.clientY - elPosition.top
        };
        //   const
      }
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas.getContext("2d");
    //设置线的颜色
    this.canvas.strokeStyle = this.strokeStyle;
    //设置线的宽度
    this.canvas.lineWidth = this.lineWidth;
    //设置线两端端点样式更加圆润
    this.canvas.lineCap = this.lineCap;
    console.log(this.getPosition);
  },
  watch: {
    isTouching() {
      document.body.addEventListener(
        "touchmove",
        function(e) {
          e.preventDefault();
        },
        { passive: false }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.signature {
  /* width: 500px;
  height: 300px; */
}
</style>
