const assert = require('assert');
const Component = require('../lib/component');

// mixin pattern borrowed from http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/
const ClassicalMixin = (superclass) => class extends superclass {
  classical() {
    return 'classical mixin';
  }
}

let instanceId = 0;
const ClassicalWithInstanceMixin = (superclass) => class extends superclass {
  constructor() {
    super();
    this.instance = instanceId++;
  }

  classical() {
    const superMsg = super.classical ? super.classical() : '';
    return `sub and super ${superMsg}`
  }
}

// test 1: basic inheritance
const basicInheritance = () => {
  class TestComponent extends Component { }
  const tc = new TestComponent;

  assert.equal(tc.on(), 'on', 'TestComponent inherits methods from Component');
};

basicInheritance();

// test 2: functional mixins
const functionalInheritance = () => {
  class TestComponent extends Component(ClassicalMixin) { }
  const tc = new TestComponent;

  assert.equal(tc.on(), 'on', 'TestComponent inherits methods from Component');
  assert.equal(tc.classical(), 'classical mixin', 'TestComponent inherits methods from ClassicalMixin');
};
functionalInheritance();

// test 3: instance properties
const instanceProperties = () => {
  instanceId = 1;
  class TestComponent extends Component(ClassicalWithInstanceMixin) { }

  const tc1 = new TestComponent;
  const tc2 = new TestComponent;

  assert.equal(tc1.instance, 1);
  assert.equal(tc2.instance, 2);
};
instanceProperties();
