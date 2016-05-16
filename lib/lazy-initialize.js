'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lazyInitialize;

var _utils = require('./private/utils');

function handleDescriptor(target, key, descriptor) {
  var configurable = descriptor.configurable;
  var enumerable = descriptor.enumerable;
  var initializer = descriptor.initializer;
  var value = descriptor.value;

  return {
    configurable: configurable,
    enumerable: enumerable,

    get: function get() {
      // This happens if someone accesses the
      // property directly on the prototype
      if (this === target) {
        return;
      }

      var ret = initializer ? initializer.call(this) : value;

      Object.defineProperty(this, key, {
        configurable: configurable,
        enumerable: enumerable,
        writable: true,
        value: ret
      });

      return ret;
    },


    set: (0, _utils.createDefaultSetter)(key)
  };
}

function lazyInitialize() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0, _utils.decorate)(handleDescriptor, args);
}