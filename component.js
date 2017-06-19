// helper to avoid too much super()
const composedMethods = [
  { name: 'onReady', identifier: 'onReadyCallback' }
];

function composeMethod(name, identifier, base, mixedIn) {
  const baseProto = base.prototype;
  const mixedInProto = mixedIn.prototype;

  if (baseProto.hasOwnProperty(name) && mixedInProto.hasOwnProperty(name)) {
    const baseMethod = baseProto[name];
    const mixedInMethod = mixedInProto[name];

    const composed = function() {
      mixedInMethod.apply(this, arguments);
      baseMethod.apply(this, arguments);
    }

    Object.defineProperty(mixedInProto, identifier, {
      value: composed
    });
  }
}

function mixin(base, mixin) {
  const mixedIn = mixin(base);

  if (base.defaultAttrs && mixedIn.defaultAttrs) {
    mixedIn.defaultAttrs = Object.assign({}, base.defaultAttrs, mixedIn.defaultAttrs);
  }

  for (let i=0; i<composedMethods.length; i++) {
    const { name, identifier } = composedMethods[i];
    composeMethod(name, identifier, base, mixedIn);
  }

  return mixedIn;
}

function componentFactory(mixins) {
  const baseComponent = class extends Component { };
  return mixins.reduceRight(mixin, baseComponent);
}

function Component(attr) {
  const args = new Array(arguments.length);
  for (let i=0; i<args.length; i++) {
    args[i] = arguments[i];
  }

  if (typeof attr === 'function' && args.length > 0) {
    return componentFactory.call(null, args);
  }

  this.createAttributes(attr);
}

Component.prototype.on = function() {
  return 'on';
};

Component.prototype.initialize = function() {
  this.onReady();
  if (this.onReadyCallback) {
    this.onReadyCallback();
  }
};

Component.prototype.createAttributes = function(attr = {}) {
  const inheritedDefaults = this.constructor.defaultAttrs || {};
  this.attr = Object.assign({}, inheritedDefaults, attr);
};

module.exports = Component;
