import Color from '../src/index';
import chai from 'chai';

const expect = chai.expect;

describe('Color', () => {
  it('is expected to throw error when called without new', () => {
    expect(() => Color()).to.throw(TypeError); // eslint-disable-line new-cap
  });
});

describe('color', () => {
  describe('prototype', () => {
    const props = [
      'r', 'g', 'b', 'r16', 'g16', 'b16', 'h', 's', 'l', 'a',
      'rgb', 'rgba', 'hsl', 'hsla', 'hex'
    ];
    props.forEach(prop => {
      it(`is expected to have ${prop} as getter/setter`, () => {
        const color = new Color();
        const proto = Reflect.getPrototypeOf(color);
        const d = Reflect.getOwnPropertyDescriptor(proto, prop);
        expect(d.get).to.be.a('function');
        expect(d.set).to.be.a('function');
      });
    });

    it('is expected to have toObject method', () => {
      const color = new Color();
      const proto = Reflect.getPrototypeOf(color);
      const d = Reflect.getOwnPropertyDescriptor(proto, 'toObject');
      expect(d.value).to.be.a('function');
    });

    it('is expected to have toString method', () => {
      const color = new Color();
      const proto = Reflect.getPrototypeOf(color);
      const d = Reflect.getOwnPropertyDescriptor(proto, 'toString');
      expect(d.value).to.be.a('function');
    });
  });

  it('is expected to be initialized to rgba(0, 0, 0, 1)', () => {
    const color = new Color();
    const expected = {
      r: 0, g: 0, b: 0,
      h: 0, s: 0, l: 0,
      a: 1
    };
    expect(color.toObject()).to.deep.equal(expected);
    expect(JSON.parse(color.toString())).to.deep.equal(expected);
  });

  describe('r', () => {
    it('is expected to set new value and update other values', () => {
      const color = new Color();
      color.r = 127;
      expect(color.r).to.deep.equal(127);
      expect(color.toObject()).to.deep.equal({
        r: 127, g: 0, b: 0,
        h: 0, s: 100, l: 25,
        a: 1
      });
    });
  });

  describe('g', () => {
    const color = new Color();
    it('is expected to set new value and update other values', () => {
      color.g = 127;
      expect(color.g).to.deep.equal(127);
      expect(color.toObject()).to.deep.equal({
        r: 0, g: 127, b: 0,
        h: 120, s: 100, l: 25,
        a: 1
      });
    });
  });

  describe('b', () => {
    it('is expected to set new value and update other values', () => {
      const color = new Color();
      color.b = 127;
      expect(color.b).to.deep.equal(127);
      expect(color.toObject()).to.deep.equal({
        r: 0, g: 0, b: 127,
        h: 240, s: 100, l: 25,
        a: 1
      });
    });
  });

  describe('r16', () => {
    it('is expected to set new value and update other values', () => {
      const color = new Color();
      color.r16 = '7f';
      expect(color.r16).to.deep.equal('7f');
      expect(color.toObject()).to.deep.equal({
        r: 127, g: 0, b: 0,
        h: 0, s: 100, l: 25,
        a: 1
      });
      color.r16 = 'f';
      expect(color.r16).to.deep.equal('ff');
      expect(color.toObject()).to.deep.equal({
        r: 255, g: 0, b: 0,
        h: 0, s: 100, l: 50,
        a: 1
      });
    });
  });

  describe('g16', () => {
    it('is expected to set new value and update other values', () => {
      const color = new Color();
      color.g16 = '7f';
      expect(color.g16).to.deep.equal('7f');
      expect(color.toObject()).to.deep.equal({
        r: 0, g: 127, b: 0,
        h: 120, s: 100, l: 25,
        a: 1
      });
      color.g16 = 'f';
      expect(color.g16).to.deep.equal('ff');
      expect(color.toObject()).to.deep.equal({
        r: 0, g: 255, b: 0,
        h: 120, s: 100, l: 50,
        a: 1
      });
    });
  });

  describe('b16', () => {
    it('is expected to set new value and update other values', () => {
      const color = new Color();
      color.b16 = '7f';
      expect(color.b16).to.deep.equal('7f');
      expect(color.toObject()).to.deep.equal({
        r: 0, g: 0, b: 127,
        h: 240, s: 100, l: 25,
        a: 1
      });
      color.b16 = 'f';
      expect(color.b16).to.deep.equal('ff');
      expect(color.toObject()).to.deep.equal({
        r: 0, g: 0, b: 255,
        h: 240, s: 100, l: 50,
        a: 1
      });
    });
  });

  describe('h', () => {
    it('is expected to set new value and update other values', () => {
      const color = new Color();
      color.h = 180;
      color.s = 100;
      color.l = 50;
      expect(color.h).to.deep.equal(180);
      expect(color.toObject()).to.deep.equal({
        r: 0, g: 255, b: 255,
        h: 180, s: 100, l: 50,
        a: 1
      });
    });
  });

  describe('s', () => {
    it('is expected to set new value and update other values', () => {
      const color = new Color();
      color.s = 50;
      color.l = 50;
      expect(color.s).to.deep.equal(50);
      expect(color.toObject()).to.deep.equal({
        r: 191, g: 64, b: 64,
        h: 0, s: 50, l: 50,
        a: 1
      });
    });
  });

  describe('l', () => {
    it('is expected to set new value and update other values', () => {
      const color = new Color();
      color.l = 50;
      expect(color.l).to.deep.equal(50);
      expect(color.toObject()).to.deep.equal({
        r: 128, g: 128, b: 128,
        h: 0, s: 0, l: 50,
        a: 1
      });
    });
  });

  describe('a', () => {
    it('is expected to set new value', () => {
      const color = new Color();
      color.a = 0.5;
      expect(color.a).to.deep.equal(0.5);
      expect(color.toObject()).to.deep.equal({
        r: 0, g: 0, b: 0,
        h: 0, s: 0, l: 0,
        a: 0.5
      });
    });
  });

  describe('rgb', () => {
    it('is expected to set new value and update other values', () => {
      const color = new Color();
      color.rgb = 'rgb(255,127,0)';
      expect(color.rgb).to.deep.equal('rgb(255, 127, 0)');
      expect(color.toObject()).to.deep.equal({
        r: 255, g: 127, b: 0,
        h: 30, s: 100, l: 50,
        a: 1
      });
    });
  });

  describe('rgba', () => {
    it('is expected to set new value and update other values', () => {
      const color = new Color();
      color.rgba = 'rgba(0,127,255,.5);';
      expect(color.rgba).to.deep.equal('rgba(0, 127, 255, 0.5)');
      expect(color.toObject()).to.deep.equal({
        r: 0, g: 127, b: 255,
        h: 210, s: 100, l: 50,
        a: 0.5
      });
    });
  });

  describe('hsl', () => {
    it('is expected to set new value and update other values', () => {
      const color = new Color();
      color.hsl = 'hsl(120,100%,50%';
      expect(color.hsl).to.deep.equal('hsl(120, 100%, 50%)');
      expect(color.toObject()).to.deep.equal({
        r: 0, g: 255, b: 0,
        h: 120, s: 100, l: 50,
        a: 1
      });
    });
  });

  describe('hsla', () => {
    it('is expected to set new value and update other values', () => {
      const color = new Color();
      color.hsla = '240,50,50,.5);';
      expect(color.hsla).to.deep.equal('hsla(240, 50%, 50%, 0.5)');
      expect(color.toObject()).to.deep.equal({
        r: 64, g: 64, b: 191,
        h: 240, s: 50, l: 50,
        a: 0.5
      });
    });
  });

  describe('hex', () => {
    it('is expected to set new value and update other values', () => {
      const color = new Color();
      color.hex = '#00ff7f';
      expect(color.hex).to.deep.equal('#00ff7f');
      expect(color.toObject()).to.deep.equal({
        r: 0, g: 255, b: 127,
        h: 150, s: 100, l: 50,
        a: 1
      });
      color.hex = 'fa0';
      expect(color.hex).to.deep.equal('#ffaa00');
      expect(color.toObject()).to.deep.equal({
        r: 255, g: 170, b: 0,
        h: 40, s: 100, l: 50,
        a: 1
      });
    });
  });
});
