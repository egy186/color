"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var hsl2rgb = function hsl2rgb(hsl) {
  var _hsl = _slicedToArray(hsl, 3);

  var h = _hsl[0];
  var s = _hsl[1];
  var l = _hsl[2];

  while (h < 0) {
    h += 360;
  }
  while (h > 360) {
    h -= 360;
  }
  s /= 100;
  l /= 100;
  var c = s * (1 - Math.abs(2 * l - 1));
  var x = c * (1 - Math.abs(h / 60 % 2 - 1));
  var m = l - c / 2;
  var r = l;
  var g = l;
  var b = l;

  if (s !== 0) {
    if (h < 60) {
      r = c + m;
      g = x + m;
      b = m;
    } else if (h < 120) {
      r = x + m;
      g = c + m;
      b = m;
    } else if (h < 180) {
      r = m;
      g = c + m;
      b = x + m;
    } else if (h < 240) {
      r = m;
      g = x + m;
      b = c + m;
    } else if (h < 300) {
      r = x + m;
      g = m;
      b = c + m;
    } else {
      r = c + m;
      g = m;
      b = x + m;
    }
  }
  return [Math.round(255 * r), Math.round(255 * g), Math.round(255 * b)];
};

exports.default = hsl2rgb;