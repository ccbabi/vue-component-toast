<template>
  <transition name="vc-toast" @after-leave="afterLeave">
    <div v-show="show" class="vc-toast" :class="classes" :style="styles">
      <i class="vc-toast-icon" :class="iconClass" v-if="iconClass !== ''" />
      <span class="vc-toast-text">{{message}}</span>
    </div>
  </transition>
</template>
<style>
  .vc-toast {
    position: fixed;
    max-width: 80%;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    box-sizing: border-box;
    text-align: center;
    z-index: 1000;
    padding: .6em 1em;
  }

  .vc-toast-top {
    left: 50%;
    top: 50px;
    transform: translate(-50%, 0);
  }

  .vc-toast-middle {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .vc-toast-bottom {
    left: 50%;
    bottom: 50px;
    transform: translate(-50%, 0);
  }

  .vc-toast-icon {
    display: block;
    font-size: 56px;
    padding: 6px 0 10px;
  }

  .vc-toast-text {
    display: block;
    font-size: 14px;
    line-height: 1.75
  }

  .vc-toast-enter-active,
  .vc-toast-leave-active {
    transition: opacity .3s;
  }

  .vc-toast-enter,
  .vc-toast-leave-to,
  .vc-toast-leave-active {
    opacity: 0;
  }

</style>
<script>
  export default {
    name: 'vc-toast',
    props: {
      message: String,
      className: {
        type: String,
        default: ''
      },
      position: {
        type: String,
        default: 'middle'
      },
      iconClass: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        show: false
      }
    },
    computed: {
      classes () {
        const cls = []
        if (this.className) cls.push(this.className)
        cls.push(`vc-toast-${this.position}`)
        return cls
      },
      styles () {
        const padding = this.iconClass ? '.6em 2em' : '.5em 1em'
        return { padding }
      }
    },
    methods: {
      afterLeave (el) {
        el.parentNode.removeChild(el)
      }
    }
  }
</script>
