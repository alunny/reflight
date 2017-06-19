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

  if (base.attributes && mixedIn.attributes) {
    mixedIn.attributes = Object.assign({}, base.attributes, mixedIn.attributes);
  }

  for (let i=0; i<composedMethods.length; i++) {
    const { name, identifier } = composedMethods[i];
    composeMethod(name, identifier, base, mixedIn);
  }

  return mixedIn;
}

module.exports = function componentFactory(Base, mixins) {
  const baseComponent = class extends Base { };
  return mixins.reduceRight(mixin, baseComponent);
}
