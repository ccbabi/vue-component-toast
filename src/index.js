import toast from './toast.vue'
import './toast.css'

const positions = ['top', 'middle', 'bottom']

const def = {
  message: '',
  position: 'middle',
  duration: 3000,
  className: '',
  iconClass: '',
  override: true,
  mask: false
}

let instancePoll

function getInstancePoll (instanceFactory) {
  const maxSize = 10
  const defKey = Math.random().toString(36).slice(2)
  const inUseInstances = {}
  const nonUseInStances = []
  let count = 0

  return {
    pick (key) {
      const instance = nonUseInStances.length
        ? nonUseInStances.shift()
        : instanceFactory(count++)

      key = key || defKey
      instance.pid = instance.pid || count

      if (!inUseInstances[key]) inUseInstances[key] = []

      inUseInstances[key].push(instance)

      return instance
    },
    recycle (val, callback) {
      const key = val.position
      const index = inUseInstances[key].indexOf(val)

      if (~index) inUseInstances[key].splice(index, 1)
      if (val.pid > maxSize) callback && callback()
      else nonUseInStances.push(val)
    },
    getInUseInstances: (key) => inUseInstances[key || defKey] || []
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
    instancePoll.recycle(this, () => {
      this.__destroy = true
    })
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

    if (!~positions.indexOf(option.position)) {
      option.position = 'middle'
    }

    if (option.override) {
      instancePoll.getInUseInstances(option.position).forEach(inUseInstance => {
        inUseInstance.close()
        clearTimeout(inUseInstance.timeoutId)
      })
    }

    const instance = instancePoll.pick(option.position).__show(option)

    if (option.duration && option.duration - 0 > 0) {
      instance.timeoutId = setTimeout(() => instance.close(), option.duration)
    }

    return instance
  }
}

function install (Vue, useOption) {
  Vue.$toast = Vue.prototype.$toast = init(Vue, useOption)
}

export default { install }
