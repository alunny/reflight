/* global $ */
const BaseComponent = require('./BaseComponent');
const subcomponent = require('./subcomponent');

class JQueryComponent extends BaseComponent { };

module.exports = subcomponent(JQueryComponent);


