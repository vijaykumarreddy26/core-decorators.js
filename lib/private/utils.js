'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDescriptor = isDescriptor;
exports.decorate = decorate;
exports.metaFor = metaFor;
exports.getOwnPropertyDescriptors = getOwnPropertyDescriptors;
exports.createDefaultSetter = createDefaultSetter;

var _lazyInitialize = require('../lazy-initialize');

var _lazyInitialize2 = _interopRequireDefault(_lazyInitialize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var defineProperty = Object.defineProperty;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
function isDescriptor(desc) {
  if (!desc || !desc.hasOwnProperty) {
    return false;
  }

  var keys = ['value', 'initializer', 'get', 'set'];

  for (var i = 0, l = keys.length; i < l; i++) {
    if (desc.hasOwnProperty(keys[i])) {
      return true;
    }
  }

  return false;
}

function decorate(handleDescriptor, entryArgs) {
  if (isDescriptor(entryArgs[entryArgs.length - 1])) {
    return handleDescriptor.apply(undefined, _toConsumableArray(entryArgs).concat([[]]));
  } else {
    return function () {
      return handleDescriptor.apply(undefined, Array.prototype.slice.call(arguments).concat([entryArgs]));
    };
  }
}

var Meta = function Meta() {
  _classCallCheck(this, Meta);
};

var META_KEY = typeof Symbol === 'function' ? Symbol('__core_decorators__') : '__core_decorators__';

function metaFor(obj) {
  if (obj.hasOwnProperty(META_KEY) === false) {
    defineProperty(obj, META_KEY, {
      // Defaults: NOT enumerable, configurable, or writable
      value: new Meta()
    });
  }

  return obj[META_KEY];
}

var getOwnKeys = getOwnPropertySymbols ? function (object) {
  return getOwnPropertyNames(object).concat(getOwnPropertySymbols(object));
} : getOwnPropertyNames;

function getOwnPropertyDescriptors(obj) {
  var descs = {};

  getOwnKeys(obj).forEach(function (key) {
    return descs[key] = getOwnPropertyDescriptor(obj, key);
  });

  return descs;
}

function createDefaultSetter(key) {
  return function set(newValue) {
    Object.defineProperty(this, key, {
      configurable: true,
      writable: true,
      // IS enumerable when reassigned by the outside word
      enumerable: true,
      value: newValue
    });

    return newValue;
  };
}