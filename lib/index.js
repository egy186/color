'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })(); /* eslint no-invalid-this: 0 */

// import polyfill

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hsl2rgb3 = require('./hsl2rgb');

var _hsl2rgb4 = _interopRequireDefault(_hsl2rgb3);

var _rgb2hsl3 = require('./rgb2hsl');

var _rgb2hsl4 = _interopRequireDefault(_rgb2hsl3);

require('core-js/fn/number/is-finite');

require('core-js/fn/reflect/apply');

require('core-js/fn/string/includes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var round = Math.round;

var PrivateProperties = function PrivateProperties() {
  var wm = new WeakMap();
  // return self => wm.get(self) || wm.set(self, Object.create(null)).get(self);
  // `WeakMap.prototype.set` does not return `this` in IE11
  return function (self) {
    return wm.get(self) || (wm.set(self, Object.create(null)), wm.get(self));
  };
};

var toHex = function toHex(n) {
  return ('0' + n.toString(16)).slice(-2);
};

var Color = (function () {
  var privateProperties = new PrivateProperties();

  var sync = function sync(changedColorScheme) {
    var pp = privateProperties(this);
    switch (changedColorScheme) {
      case 'rgb':
        var _rgb2hsl = (0, _rgb2hsl4.default)([this.r, this.g, this.b]);

        var _rgb2hsl2 = _slicedToArray(_rgb2hsl, 3);

        pp.h = _rgb2hsl2[0];
        pp.s = _rgb2hsl2[1];
        pp.l = _rgb2hsl2[2];

        return true;
      case 'hsl':
        var _hsl2rgb = (0, _hsl2rgb4.default)([this.h, this.s, this.l]);

        var _hsl2rgb2 = _slicedToArray(_hsl2rgb, 3);

        pp.r = _hsl2rgb2[0];
        pp.g = _hsl2rgb2[1];
        pp.b = _hsl2rgb2[2];

        return true;
      default:
        return false;
    }
  };

  var setNumber = function setNumber(key, value) {
    value = parseFloat(value);
    if (Number.isFinite(value)) {
      privateProperties(this)[key] = value;
      if ('rgb'.includes(key)) {
        Reflect.apply(sync, this, ['rgb']);
      } else if ('hsl'.includes(key)) {
        Reflect.apply(sync, this, ['hsl']);
      }
    }
    return value;
  };

  var setHex = function setHex(key, value) {
    value = String(value);
    if (value.length === 1) {
      value += value;
    }
    return Reflect.apply(setNumber, this, [key, parseInt(value, 16)]);
  };

  var setString = function setString(key, value) {
    value = value.replace(/[rgbhsla();\s]/g, '').split(',').map(parseFloat);
    var pp = privateProperties(this);
    for (var i = 0; i < Math.min(key.length, value.length); i++) {
      if (Number.isFinite(value[i])) {
        pp[key[i]] = value[i];
      }
    }
    Reflect.apply(sync, this, [key.substr(0, 3)]);
    return value;
  };

  return (function () {
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
        return Reflect.apply(setNumber, this, ['r', n]);
      }
    }, {
      key: 'g',
      get: function get() {
        return privateProperties(this).g;
      },
      set: function set(n) {
        return Reflect.apply(setNumber, this, ['g', n]);
      }
    }, {
      key: 'b',
      get: function get() {
        return privateProperties(this).b;
      },
      set: function set(n) {
        return Reflect.apply(setNumber, this, ['b', n]);
      }
    }, {
      key: 'r16',
      get: function get() {
        return toHex(this.r);
      },
      set: function set(s) {
        return Reflect.apply(setHex, this, ['r', s]);
      }
    }, {
      key: 'g16',
      get: function get() {
        return toHex(this.g);
      },
      set: function set(s) {
        return Reflect.apply(setHex, this, ['g', s]);
      }
    }, {
      key: 'b16',
      get: function get() {
        return toHex(this.b);
      },
      set: function set(s) {
        return Reflect.apply(setHex, this, ['b', s]);
      }
    }, {
      key: 'h',
      get: function get() {
        return privateProperties(this).h;
      },
      set: function set(n) {
        return Reflect.apply(setNumber, this, ['h', n]);
      }
    }, {
      key: 's',
      get: function get() {
        return privateProperties(this).s;
      },
      set: function set(n) {
        return Reflect.apply(setNumber, this, ['s', n]);
      }
    }, {
      key: 'l',
      get: function get() {
        return privateProperties(this).l;
      },
      set: function set(n) {
        return Reflect.apply(setNumber, this, ['l', n]);
      }
    }, {
      key: 'a',
      get: function get() {
        return privateProperties(this).a;
      },
      set: function set(n) {
        return Reflect.apply(setNumber, this, ['a', n]);
      }
    }, {
      key: 'rgb',
      get: function get() {
        return 'rgb(' + round(this.r) + ', ' + round(this.g) + ', ' + round(this.b) + ')';
      },
      set: function set(s) {
        return Reflect.apply(setString, this, ['rgb', s]);
      }
    }, {
      key: 'rgba',
      get: function get() {
        return 'rgba(' + round(this.r) + ', ' + round(this.g) + ', ' + round(this.b) + ', ' + this.a + ')';
      },
      set: function set(s) {
        return Reflect.apply(setString, this, ['rgba', s]);
      }
    }, {
      key: 'hsl',
      get: function get() {
        return 'hsl(' + round(this.h) + ', ' + round(this.s) + '%, ' + round(this.l) + '%)';
      },
      set: function set(s) {
        return Reflect.apply(setString, this, ['hsl', s]);
      }
    }, {
      key: 'hsla',
      get: function get() {
        return 'hsla(' + round(this.h) + ', ' + round(this.s) + '%, ' + round(this.l) + '%, ' + this.a + ')';
      },
      set: function set(s) {
        return Reflect.apply(setString, this, ['hsla', s]);
      }
    }, {
      key: 'hex',
      get: function get() {
        return '#' + this.r16 + this.g16 + this.b16;
      },
      set: function set(s) {
        s = s.replace('#', '');
        var length = 2;
        if (s.length === 3) {
          length = 1;
        } else if (s.length !== 6) {
          s = (s + '000000').substr(0, 6);
        }
        Reflect.apply(setHex, this, ['r', s.substr(0, length)]);
        Reflect.apply(setHex, this, ['g', s.substr(length, length)]);
        Reflect.apply(setHex, this, ['b', s.substr(length * 2, length)]);
      }
    }]);

    return _class;
  })();
})();

exports.default = Color;