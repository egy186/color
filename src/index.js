import 'core-js/fn/array/includes';
import 'core-js/fn/number/is-finite';
import 'core-js/fn/reflect/set';
import 'core-js/fn/string/pad-start';
import 'core-js/fn/string/repeat';
import hsl2rgb from './hsl2rgb';
import rgb2hsl from './rgb2hsl';

const round = Math.round;

const PrivateProperties = () => {
  const wm = new WeakMap();
  // return self => wm.get(self) || wm.set(self, Object.create(null)).get(self);
  // `WeakMap.prototype.set` does not return `this` in IE11
  return self => wm.get(self) || (wm.set(self, Object.create(null)), wm.get(self));
};

const numberToHex = n => n.toString(16).padStart(2, '0');
const hexToNumber = s => parseInt(s.length === 1 ? s.repeat(2) : s, 16);

const Color = (() => {
  const privateProperties = new PrivateProperties();

  const isRGB = key => ['r', 'g', 'b'].includes(key);
  const isHSL = key => ['h', 's', 'l'].includes(key);
  const setNumber = (target, property, value) => {
    const num = parseFloat(value);
    if ((isRGB(property) || isHSL(property) || property === 'a') && Number.isFinite(num)) {
      const result = Reflect.set(target, property, num);
      if (isRGB(property)) {
        [target.h, target.s, target.l] = rgb2hsl([target.r, target.g, target.b]);
      } else if (isHSL(property)) {
        [target.r, target.g, target.b] = hsl2rgb([target.h, target.s, target.l]);
      }
      return result;
    }
    return false;
  };

  const setString = (target, property, value) => {
    const values = value.replace(/[rgbhsla(%);\s]/g, '').split(',').map(parseFloat);
    return property.split('').slice(0, values.length).every((key, i) => Reflect.set(target, key, values[i]));
  };

  return class {
    constructor () {
      const pp = privateProperties(this);
      pp.r = 0;
      pp.g = 0;
      pp.b = 0;
      pp.h = 0;
      pp.s = 0;
      pp.l = 0;
      pp.a = 1;
    }

    get r () {
      return privateProperties(this).r;
    }
    set r (n) {
      return setNumber(privateProperties(this), 'r', n);
    }

    get g () {
      return privateProperties(this).g;
    }
    set g (n) {
      return setNumber(privateProperties(this), 'g', n);
    }

    get b () {
      return privateProperties(this).b;
    }
    set b (n) {
      return setNumber(privateProperties(this), 'b', n);
    }

    get r16 () {
      return numberToHex(this.r);
    }
    set r16 (s) {
      return Reflect.set(this, 'r', hexToNumber(s));
    }

    get g16 () {
      return numberToHex(this.g);
    }
    set g16 (s) {
      return Reflect.set(this, 'g', hexToNumber(s));
    }

    get b16 () {
      return numberToHex(this.b);
    }
    set b16 (s) {
      return Reflect.set(this, 'b', hexToNumber(s));
    }

    get h () {
      return privateProperties(this).h;
    }
    set h (n) {
      return setNumber(privateProperties(this), 'h', n);
    }

    get s () {
      return privateProperties(this).s;
    }
    set s (n) {
      return setNumber(privateProperties(this), 's', n);
    }

    get l () {
      return privateProperties(this).l;
    }
    set l (n) {
      return setNumber(privateProperties(this), 'l', n);
    }

    get a () {
      return privateProperties(this).a;
    }
    set a (n) {
      return setNumber(privateProperties(this), 'a', n);
    }

    get rgb () {
      return `rgb(${round(this.r)}, ${round(this.g)}, ${round(this.b)})`;
    }
    set rgb (s) {
      return setString(this, 'rgb', s);
    }

    get rgba () {
      return `rgba(${round(this.r)}, ${round(this.g)}, ${round(this.b)}, ${this.a})`;
    }
    set rgba (s) {
      return setString(this, 'rgba', s);
    }

    get hsl () {
      return `hsl(${round(this.h)}, ${round(this.s)}%, ${round(this.l)}%)`;
    }
    set hsl (s) {
      return setString(this, 'hsl', s);
    }

    get hsla () {
      return `hsla(${round(this.h)}, ${round(this.s)}%, ${round(this.l)}%, ${this.a})`;
    }
    set hsla (s) {
      return setString(this, 'hsla', s);
    }

    get hex () {
      return `#${numberToHex(this.r)}${numberToHex(this.g)}${numberToHex(this.b)}`;
    }
    set hex (s) {
      let hex = s.replace('#', '');
      if (hex.length === 3) {
        hex = hex.split('').map(str => str.repeat(2)).join('');
      } else if (hex.length % 2 !== 0) {
        hex += '0';
      }
      hex = hex.match(/.{2}/g);
      return ['r16', 'g16', 'b16'].slice(0, hex.length).every((key, i) => Reflect.set(this, key, hex[i]));
    }

    toObject () {
      return privateProperties(this);
    }

    toString () {
      return JSON.stringify(this.toObject());
    }
  };
})();

export default Color;
