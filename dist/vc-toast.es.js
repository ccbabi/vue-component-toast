var script = {
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
  data: function data() {
    return {
      show: false
    };
  },

  computed: {
    classes: function classes() {
      var cls = [];
      if (this.className) cls.push(this.className);
      cls.push('vc-toast-' + this.position);
      return cls;
    },
    styles: function styles() {
      var padding = this.iconClass ? '.6em 2em' : '.5em 1em';
      return { padding: padding };
    }
  },
  methods: {
    afterLeave: function afterLeave(el) {
      el.parentNode.removeChild(el);
    }
  }
};

var __vue_script__ = script;

var __vue_render__ = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("transition", { attrs: { name: "vc-toast" }, on: { "after-leave": _vm.afterLeave } }, [_c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.show,
      expression: "show"
    }],
    staticClass: "vc-toast",
    class: _vm.classes,
    style: _vm.styles
  }, [_vm.iconClass !== "" ? _c("i", { staticClass: "vc-toast-icon", class: _vm.iconClass }) : _vm._e(), _vm._v(" "), _c("span", { staticClass: "vc-toast-text" }, [_vm._v(_vm._s(_vm.message))])])]);
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

var __vue_template__ = typeof __vue_render__ !== 'undefined' ? { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ } : {};

var __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-5fbd2d7f_0", { source: "\n.vc-toast {\n  position: fixed;\n  max-width: 80%;\n  border-radius: 5px;\n  background: rgba(0, 0, 0, 0.7);\n  color: #fff;\n  box-sizing: border-box;\n  text-align: center;\n  z-index: 1000;\n  padding: .6em 1em;\n}\n.vc-toast-top {\n  left: 50%;\n  top: 50px;\n  transform: translate(-50%, 0);\n}\n.vc-toast-middle {\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n}\n.vc-toast-bottom {\n  left: 50%;\n  bottom: 50px;\n  transform: translate(-50%, 0);\n}\n.vc-toast-icon {\n  display: block;\n  font-size: 56px;\n  padding: 6px 0 10px;\n}\n.vc-toast-text {\n  display: block;\n  font-size: 14px;\n  line-height: 1.75\n}\n.vc-toast-enter-active,\n.vc-toast-leave-active {\n  transition: opacity .3s;\n}\n.vc-toast-enter,\n.vc-toast-leave-to,\n.vc-toast-leave-active {\n  opacity: 0;\n}\n\n", map: undefined, media: undefined });
};

var __vue_scope_id__ = undefined;

var __vue_module_identifier__ = undefined;

var __vue_is_functional_template__ = false;

function __vue_normalize__(template, style, script$$1, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = script$$1 || {};

  {
    component.__file = "/Users/wangjie/repositories/vue-component-toast/src/toast.vue";
  }

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;

    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  {
    var hook = void 0;
    if (style) {
      hook = function hook(context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook !== undefined) {
      if (component.functional) {
        var originalRender = component.render;
        component.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        var existing = component.beforeCreate;
        component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }
  }

  return component;
}

function __vue_create_injector__() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return;

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;

      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';

        if (css.media) el.setAttribute('media', css.media);
        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}


var toast = __vue_normalize__(__vue_template__, __vue_inject_styles__, typeof __vue_script__ === 'undefined' ? {} : __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, typeof __vue_create_injector__ !== 'undefined' ? __vue_create_injector__ : function () {}, typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var positions = ['top', 'middle', 'bottom'];

var def = {
  message: '',
  position: 'middle',
  duration: 3000,
  className: '',
  iconClass: '',
  override: true
};

var instancePoll = void 0;

function getInstancePoll(instanceFactory) {
  var inUseInstances = [];
  var nonUseInStances = [];

  return {
    pick: function pick() {
      var instance = nonUseInStances.length ? nonUseInStances.shift() : instanceFactory();
      inUseInstances.push(instance);
      return instance;
    },
    recycle: function recycle(val) {
      var index = inUseInstances.indexOf(val);
      if (~index) inUseInstances.splice(index, 1);
      nonUseInStances.push(val);
    },

    getInUseInstances: function getInUseInstances() {
      return inUseInstances;
    }
  };
}

function initToast(Vue) {
  var body = document.body || document.body.getElementsByTagName('body')[0];
  var Toast = Vue.extend(toast);

  Toast.prototype.__show = function (option) {
    if (this.show) return this;
    body.appendChild(this.$mount().$el);
    this.__set(option);
    this.show = true;
    return this;
  };

  Toast.prototype.close = function () {
    if (!this.show) return;
    this.show = false;
    instancePoll.recycle(this);
  };

  Toast.prototype.__set = function (data) {
    var _this = this;

    Object.keys(data).forEach(function (key) {
      _this[key] = data[key];
    });
  };

  return Toast;
}

function init(Vue, useOption) {
  var defaultOption = _extends({}, def, useOption);
  var Toast = initToast(Vue);
  instancePoll = getInstancePoll(function () {
    return new Toast();
  });
  return function (callOption) {
    if (typeof callOption === 'string') {
      callOption = { message: callOption };
    }

    var option = _extends({}, defaultOption, callOption);

    if (option.override) {
      instancePoll.getInUseInstances().forEach(function (inUseInstance) {
        if (instance !== inUseInstance) inUseInstance.close();
      });
    }

    if (!~positions.indexOf(option.position)) {
      option.position = 'middle';
    }

    var instance = instancePoll.pick(option.override).__show(option);
    clearTimeout(instance.timeoutId);

    if (option.duration) {
      instance.timeoutId = setTimeout(function () {
        return instance.close();
      }, option.duration);
    }

    return instance;
  };
}

var index = {
  install: function install(Vue, useOption) {
    Vue.$toast = Vue.prototype.$toast = init(Vue, useOption);
  }
};

export default index;
