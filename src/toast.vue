<template>
  <div :class="className">
    <div v-if="mask" class="vc-toast-mask" />
    <transition name="vc-toast" @after-leave="afterLeave">
      <div v-show="show" :class="['vc-toast', `is-${this.position}`]" :style="styles">
        <i v-if="iconClass !== ''" class="vc-toast-icon" :class="iconClass" />
        <span class="vc-toast-text">{{message}}</span>
      </div>
    </transition>
  </div>
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
      },
      mask: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        show: false
      }
    },
    computed: {
      styles () {
        const padding = this.iconClass ? '.6em 2em' : '.4em .8em'
        return { padding }
      }
    },
    methods: {
      afterLeave () {
        if (this.__destroy) this.$destroy()
        this.$el.parentNode.removeChild(this.$el)
      }
    }
  }
</script>
