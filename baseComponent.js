// use "old-style" prototypal inheritance to support mixin form
function BaseComponent(node, attr) {
  this.createAttributes(attr);
}

BaseComponent.prototype.initialize = function() {
  this.onReady();
  if (this.onReadyCallback) {
    this.onReadyCallback();
  }
}

BaseComponent.prototype.createAttributes = function(attr = {}) {
  const inheritedDefaults = this.constructor.attributes || {};
  this.attr = Object.assign({}, inheritedDefaults, attr);
}

BaseComponent.prototype.on = function() {
  return 'on';
}

BaseComponent.prototype.off = function() {
}

BaseComponent.prototype.select = function(selector) {
}

BaseComponent.prototype.teardown = function() {
}

module.exports = BaseComponent;
