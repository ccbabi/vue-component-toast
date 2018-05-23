import toast from './toast.vue'
import './toast.css'

const positions = ['top', 'middle', 'bottom']

const def = {
  message: '',
  position: 'middle',
  duration: 3000,
  className: '',
  iconClass: '',
  override: true
}

let instancePoll

function getInstancePoll (instanceFactory) {
  const inUseInstances = []
  const nonUseInStances = []

  return {
    pick () {
      const instance = nonUseInStances.length
        ? nonUseInStances.shift()
        : instanceFactory()
      inUseInstances.push(instance)
      return instance
    },
    recycle (val) {
      const index = inUseInstances.indexOf(val)
      if (~index) inUseInstances.splice(index, 1)
      nonUseInStances.push(val)
    },
    getInUseInstances: () => inUseInstances
  }
}

function initToast (Vue) {
  const body = document.body || document.body.getElementsByTagName('body')[0]
  const Toast = Vue.extend(toast)

  Toast.prototype.__show = function (option) {
    if (this.show) return this
    body.appendChild(this.$mount().$el)
    this.__set(option)
    this.show = true
    return this
  }

  Toast.prototype.close = function () {
    if (!this.show) return
    this.show = false
    instancePoll.recycle(this)
  }

  Toast.prototype.__set = function (data) {
    Object.keys(data).forEach(key => {
      this[key] = data[key]
    })
  }

  return Toast
}

function init (Vue, useOption) {
  const defaultOption = { ...def, ...useOption }
  const Toast = initToast(Vue)
  instancePoll = getInstancePoll(() => new Toast())
  return (callOption) => {
    if (typeof callOption === 'string') {
      callOption = { message: callOption }
    }

    const option = { ...defaultOption, ...callOption }

    if (option.override) {
      instancePoll.getInUseInstances().forEach(inUseInstance => inUseInstance.close())
    }

    if (!~positions.indexOf(option.position)) {
      option.position = 'middle'
    }

    const instance = instancePoll.pick(option.override).__show(option)
    clearTimeout(instance.timeoutId)

    if (option.duration) {
      instance.timeoutId = setTimeout(() => instance.close(), option.duration)
    }

    return instance
  }
}

function install (Vue, useOption) {
  Vue.$toast = Vue.prototype.$toast = init(Vue, useOption)
}

export default { install }

if (window.Vue) {
  setTimeout(() => {
    Vue.use(window['vc-toast'], window.vcToastOption || {})  // eslint-disable-line no-undef
  }, 0)
}
