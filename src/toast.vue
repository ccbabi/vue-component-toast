<template>
  <transition name="vc-toast" @after-leave="afterLeave">
    <div v-show="show" class="vc-toast" :class="classes" :style="styles">
      <i class="vc-toast-icon" :class="iconClass" v-if="iconClass !== ''" />
      <span class="vc-toast-text">{{message}}</span>
    </div>
  </transition>
</template>
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
