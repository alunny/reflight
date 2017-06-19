/*
 * test component with matching api to jquery or DOM component
 */
const BaseComponent = require('../BaseComponent');
const subcomponent = require('../subcomponent');

class TestComponent extends BaseComponent { };

module.exports = subcomponent(TestComponent);
