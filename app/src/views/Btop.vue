<template>
<transition>
  <div class="backtop" v-show="show" @click="backTop">
    <van-icon name="arrow-up" size="30" />
  </div>
</transition>
  
</template>
<script>
export default {
  name:'Btop',
  data() {
    return {
      timeout:'',
      show: false,
    }
  },
   mounted() {
    //获取当前的页面滚动事件，然后执行 this.showheader事件
    window.addEventListener("scroll", this.showheader);
  },
  destroyed() {
    window.removeEventListener("scroll", this.showheader);
  },
   methods: {
    showheader() {
      //当前屏幕等于多少执行的事件
      clearTimeout(this.timeout)
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.scrollTop = scrollTop;
      if (scrollTop > 700) {
        //当屏幕大于541的时候，就显示，小于则不显示
        this.show = true;
      } else {
        this.show = false;
      }
      this.timeout=setTimeout(() => {
        this.show = false;
      }, 3000);
    },
    backTop() {
      clearTimeout(this.timeout)
        //返回头部的动画
        const that = this
        let timer = setInterval(() => {
          let ispeed = Math.floor(-that.scrollTop / 7)
          document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
          if (that.scrollTop === 0) {
            clearInterval(timer)
          }
        }, 10)
    }
  }
}
</script>
<style scoped>
.backtop {
  width: 3.125rem;
  height: 3.125rem;
  text-align: center;
  line-height: 3.75rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  position: fixed;
  bottom: 5.3125rem;
  right: 0.9375rem;
}
.v-enter{
  opacity: 0;
}
.v-enter-to{
  opacity: 1;
}
.v-enter-active{
  transition: opacity 1s;
}
.v-leave{
  opacity: 1;
}
.v-leave-to{
  opacity: 0;
}
.v-leave-active{
  transition: opacity 1s;
}
</style>
