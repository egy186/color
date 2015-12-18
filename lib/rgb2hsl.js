"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var rgb2hsl = function rgb2hsl(rgb) {
  var _Math, _Math2;

  rgb = rgb.map(function (n) {
    return n / 255;
  });
  var max = (_Math = Math).max.apply(_Math, _toConsumableArray(rgb));
  var min = (_Math2 = Math).min.apply(_Math2, _toConsumableArray(rgb));
  var sum = max + min;
  var delta = max - min;
  var _rgb = rgb;

  var _rgb2 = _slicedToArray(_rgb, 3);

  var r = _rgb2[0];
  var g = _rgb2[1];
  var b = _rgb2[2];

  var h = 0,
      s = 0;
  var l = sum * 50;
  if (delta !== 0) {
    switch (max) {// eslint-disable-line default-case
      case r:
        h = 60 * (g - b) / delta;
        break;
      case g:
        h = 120 + 60 * (b - r) / delta;
        break;
      case b:
        h = 240 + 60 * (r - g) / delta;
        break;
    }
    if (h < 0) {
      h += 360;
    }
    if (l < 50) {
      s = delta * 100 / sum;
    } else {
      s = delta * 100 / (2 - sum);
    }
  }
  return [Math.round(h), Math.round(s), Math.round(l)];
};

exports.default = rgb2hsl;