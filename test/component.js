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
  constructor(attr) {
    super(attr);
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

  assert.equal(tc.on(), 'on');
};

basicInheritance();

// test 2: functional mixins
const functionalInheritance = () => {
  class TestComponent extends Component(ClassicalMixin) { }
  const tc = new TestComponent;

  assert.equal(tc.on(), 'on');
  assert.equal(tc.classical(), 'classical mixin');
};
functionalInheritance();

// test 3: instance properties
const instanceProperties = () => {
  instanceId = 1;
  class TestComponent extends Component(ClassicalWithInstanceMixin) { };

  const tc1 = new TestComponent;
  const tc2 = new TestComponent;

  assert.equal(tc1.instance, 1);
  assert.equal(tc2.instance, 2);
};
instanceProperties();

// test 4: multiple mixins, applied right to left
const multipleMixins = () => {
  class TestComponent extends Component(ClassicalMixin, ClassicalWithInstanceMixin) { };
  const tc = new TestComponent;

  assert.equal(tc.classical(), 'sub and super classical mixin');
};
multipleMixins();
