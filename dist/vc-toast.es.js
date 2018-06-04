//
//
//
//
//
//
//
//
//
//
//

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
    },
    mask: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      show: false
    };
  },

  computed: {
    styles: function styles() {
      var padding = this.iconClass ? '.6em 2em' : '.4em .8em';
      return { padding: padding };
    }
  },
  methods: {
    afterLeave: function afterLeave() {
      if (this.__destroy) this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};

var __vue_script__ = script;

/* template */
var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.className }, [_vm.mask ? _c('div', { staticClass: "vc-toast-mask" }) : _vm._e(), _vm._v(" "), _c('transition', { attrs: { "name": "vc-toast" }, on: { "after-leave": _vm.afterLeave } }, [_c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.show, expression: "show" }], class: ['vc-toast', "is-" + this.position], style: _vm.styles }, [_vm.iconClass !== '' ? _c('i', { staticClass: "vc-toast-icon", class: _vm.iconClass }) : _vm._e(), _vm._v(" "), _c('span', { staticClass: "vc-toast-text" }, [_vm._v(_vm._s(_vm.message))])])])], 1);
};
var __vue_staticRenderFns__ = [];

var __vue_template__ = typeof __vue_render__ !== 'undefined' ? { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ } : {};
/* style */
var __vue_inject_styles__ = undefined;
/* scoped */
var __vue_scope_id__ = undefined;
/* module identifier */
var __vue_module_identifier__ = undefined;
/* functional template */
var __vue_is_functional_template__ = false;
/* component normalizer */
function __vue_normalize__(template, style, script$$1, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = script$$1 || {};

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;

    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  return component;
}
/* style inject */
function __vue_create_injector__() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;

      style.ids.push(id);

      if (css.map) {
        // https://developer.chrome.com/devtools/docs/javascript-debugging
        // this makes source maps inside style tags work properly in Chrome
        code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
        // http://stackoverflow.com/a/26603875
        code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
      }

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
/* style inject SSR */

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
  override: true,
  mask: false
};

var instancePoll = void 0;

function getInstancePoll(instanceFactory) {
  var maxSize = 10;
  var defKey = Math.random().toString(36).slice(2);
  var inUseInstances = {};
  var nonUseInStances = [];
  var count = 0;

  return {
    pick: function pick(key) {
      var instance = nonUseInStances.length ? nonUseInStances.shift() : instanceFactory(count++);

      key = key || defKey;
      instance.pid = instance.pid || count;

      if (!inUseInstances[key]) inUseInstances[key] = [];

      inUseInstances[key].push(instance);

      return instance;
    },
    recycle: function recycle(val, callback) {
      var key = val.position;
      var index = inUseInstances[key].indexOf(val);

      if (~index) inUseInstances[key].splice(index, 1);
      if (val.pid > maxSize) callback && callback();else nonUseInStances.push(val);
    },

    getInUseInstances: function getInUseInstances(key) {
      return inUseInstances[key || defKey] || [];
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
    var _this = this;

    if (!this.show) return;
    this.show = false;
    instancePoll.recycle(this, function () {
      _this.__destroy = true;
    });
  };

  Toast.prototype.__set = function (data) {
    var _this2 = this;

    Object.keys(data).forEach(function (key) {
      _this2[key] = data[key];
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

    if (!~positions.indexOf(option.position)) {
      option.position = 'middle';
    }

    if (option.override) {
      instancePoll.getInUseInstances(option.position).forEach(function (inUseInstance) {
        inUseInstance.close();
        clearTimeout(inUseInstance.timeoutId);
      });
    }

    var instance = instancePoll.pick(option.position).__show(option);

    if (option.duration && option.duration - 0 > 0) {
      instance.timeoutId = setTimeout(function () {
        return instance.close();
      }, option.duration);
    }

    return instance;
  };
}

function install(Vue, useOption) {
  Vue.$toast = Vue.prototype.$toast = init(Vue, useOption);
}

var index = { install: install };

export default index;
