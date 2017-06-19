function componentFactory(mixins) {
  const baseComponent = class extends Component { };
  return mixins.reduceRight((base,mixin) => {
    const mixedIn = mixin(base);

    if (base.defaultAttrs && mixedIn.defaultAttrs) {
      mixedIn.defaultAttrs = Object.assign({}, base.defaultAttrs, mixedIn.defaultAttrs);
    }

    return mixedIn
  }, baseComponent);
}

function Component(attr) {
  const args = new Array(arguments.length);
  for (let i=0; i<args.length; i++) {
    args[i] = arguments[i];
  }

  if (typeof attr !== 'undefined' && args.length > 0) {
    return componentFactory.call(null, args);
  }
}

Component.prototype.on = function() {
  return 'on';
}

module.exports = Component;
