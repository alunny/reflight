// utility for "subclassing" base component, to use jquery, dom, or synthetic/test APIs
const BaseComponent = require('./baseComponent');
const factory = require('./factory');

// takes a subclass (class expression or function)
// returns a constructor for a new class that extends the BaseComponent
// nb: subclasses' constructors are ignored
module.exports = (subclass) => {
  function SubComponent(node, attr) {
    const args = new Array(arguments.length);
    for (let i=0; i<args.length; i++) {
      args[i] = arguments[i];
    }

    if (typeof node === 'function' && args.length > 0) {
      return factory(subclass, args);
    }

    BaseComponent.call(this, node, attr);
  };
  SubComponent.prototype = new subclass;
  return SubComponent;
};
