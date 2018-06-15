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

let instancePoll, body

function getInstancePoll (instanceFactory) {
  const maxSize = 3
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

function __show (option) {
  if (this.show) return this
  body.appendChild(this.$mount().$el)
  this.__setData(option)
  this.show = true
  return this
}

function close () {
  if (!this.show) return
  this.show = false
  instancePoll.recycle(this, () => {
    this.__destroy = true
  })
}

function __setData (data) {
  Object.keys(def).forEach(prop => {
    this[prop] = data[prop]
  })
}

function initToast (Vue) {
  const Toast = Vue.extend(toast)
  Object.assign(Toast.prototype, { __show, close, __setData })
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
  body = document.body ||
    document.querySelector('body') ||
    document.body.getElementsByTagName('body')[0]
}

export default { install }
