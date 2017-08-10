'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint-disable import/no-unassigned-import */

/* eslint-enable import/no-unassigned-import */


require('core-js/fn/array/includes');

require('core-js/fn/number/is-finite');

require('core-js/fn/reflect/set');

require('core-js/fn/string/pad-start');

require('core-js/fn/string/repeat');

var _hsl2rgb3 = require('./hsl2rgb');

var _hsl2rgb4 = _interopRequireDefault(_hsl2rgb3);

var _rgb2hsl3 = require('./rgb2hsl');

var _rgb2hsl4 = _interopRequireDefault(_rgb2hsl3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var round = Math.round;


var PrivateProperties = function PrivateProperties() {
  var wm = new WeakMap();
  // `WeakMap.prototype.set` does not return `this` in IE11
  return function (self) {
    return wm.get(self) || (wm.set(self, Object.create(null)), wm.get(self));
  };
};

var numberToHex = function numberToHex(n) {
  return n.toString(16).padStart(2, '0');
};
var hexToNumber = function hexToNumber(s) {
  return parseInt(s.length === 1 ? s.repeat(2) : s, 16);
};

var Color = function () {
  var privateProperties = new PrivateProperties();

  var isRGB = function isRGB(key) {
    return ['r', 'g', 'b'].includes(key);
  };
  var isHSL = function isHSL(key) {
    return ['h', 's', 'l'].includes(key);
  };
  var setNumber = function setNumber(target, property, value) {
    var num = parseFloat(value);
    if ((isRGB(property) || isHSL(property) || property === 'a') && Number.isFinite(num)) {
      var result = Reflect.set(target, property, num);
      if (isRGB(property)) {
        var _rgb2hsl = (0, _rgb2hsl4.default)([target.r, target.g, target.b]);

        var _rgb2hsl2 = _slicedToArray(_rgb2hsl, 3);

        target.h = _rgb2hsl2[0];
        target.s = _rgb2hsl2[1];
        target.l = _rgb2hsl2[2];
      } else if (isHSL(property)) {
        var _hsl2rgb = (0, _hsl2rgb4.default)([target.h, target.s, target.l]);

        var _hsl2rgb2 = _slicedToArray(_hsl2rgb, 3);

        target.r = _hsl2rgb2[0];
        target.g = _hsl2rgb2[1];
        target.b = _hsl2rgb2[2];
      }
      return result;
    }
    return false;
  };

  var setString = function setString(target, property, value) {
    var values = value.replace(/[rgbhsla(%);\s]/g, '').split(',').map(parseFloat);
    return property.split('').slice(0, values.length).every(function (key, i) {
      return Reflect.set(target, key, values[i]);
    });
  };

  return function () {
    function _class() {
      _classCallCheck(this, _class);

      var pp = privateProperties(this);
      pp.r = 0;
      pp.g = 0;
      pp.b = 0;
      pp.h = 0;
      pp.s = 0;
      pp.l = 0;
      pp.a = 1;
    }

    _createClass(_class, [{
      key: 'toObject',
      value: function toObject() {
        return privateProperties(this);
      }
    }, {
      key: 'toString',
      value: function toString() {
        return JSON.stringify(this.toObject());
      }
    }, {
      key: 'r',
      get: function get() {
        return privateProperties(this).r;
      },
      set: function set(n) {
        return setNumber(privateProperties(this), 'r', n);
      }
    }, {
      key: 'g',
      get: function get() {
        return privateProperties(this).g;
      },
      set: function set(n) {
        return setNumber(privateProperties(this), 'g', n);
      }
    }, {
      key: 'b',
      get: function get() {
        return privateProperties(this).b;
      },
      set: function set(n) {
        return setNumber(privateProperties(this), 'b', n);
      }
    }, {
      key: 'r16',
      get: function get() {
        return numberToHex(this.r);
      },
      set: function set(s) {
        return Reflect.set(this, 'r', hexToNumber(s));
      }
    }, {
      key: 'g16',
      get: function get() {
        return numberToHex(this.g);
      },
      set: function set(s) {
        return Reflect.set(this, 'g', hexToNumber(s));
      }
    }, {
      key: 'b16',
      get: function get() {
        return numberToHex(this.b);
      },
      set: function set(s) {
        return Reflect.set(this, 'b', hexToNumber(s));
      }
    }, {
      key: 'h',
      get: function get() {
        return privateProperties(this).h;
      },
      set: function set(n) {
        return setNumber(privateProperties(this), 'h', n);
      }
    }, {
      key: 's',
      get: function get() {
        return privateProperties(this).s;
      },
      set: function set(n) {
        return setNumber(privateProperties(this), 's', n);
      }
    }, {
      key: 'l',
      get: function get() {
        return privateProperties(this).l;
      },
      set: function set(n) {
        return setNumber(privateProperties(this), 'l', n);
      }
    }, {
      key: 'a',
      get: function get() {
        return privateProperties(this).a;
      },
      set: function set(n) {
        return setNumber(privateProperties(this), 'a', n);
      }
    }, {
      key: 'rgb',
      get: function get() {
        return `rgb(${round(this.r)}, ${round(this.g)}, ${round(this.b)})`;
      },
      set: function set(s) {
        return setString(this, 'rgb', s);
      }
    }, {
      key: 'rgba',
      get: function get() {
        return `rgba(${round(this.r)}, ${round(this.g)}, ${round(this.b)}, ${this.a})`;
      },
      set: function set(s) {
        return setString(this, 'rgba', s);
      }
    }, {
      key: 'hsl',
      get: function get() {
        return `hsl(${round(this.h)}, ${round(this.s)}%, ${round(this.l)}%)`;
      },
      set: function set(s) {
        return setString(this, 'hsl', s);
      }
    }, {
      key: 'hsla',
      get: function get() {
        return `hsla(${round(this.h)}, ${round(this.s)}%, ${round(this.l)}%, ${this.a})`;
      },
      set: function set(s) {
        return setString(this, 'hsla', s);
      }
    }, {
      key: 'hex',
      get: function get() {
        return `#${numberToHex(this.r)}${numberToHex(this.g)}${numberToHex(this.b)}`;
      },
      set: function set(s) {
        var _this = this;

        var hex = s.replace('#', '');
        if (hex.length === 3) {
          hex = hex.split('').map(function (str) {
            return str.repeat(2);
          }).join('');
        } else if (hex.length % 2 !== 0) {
          hex += '0';
        }
        hex = hex.match(/.{2}/g);
        return ['r16', 'g16', 'b16'].slice(0, hex.length).every(function (key, i) {
          return Reflect.set(_this, key, hex[i]);
        });
      }
    }]);

    return _class;
  }();
}();

exports.default = Color;