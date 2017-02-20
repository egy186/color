import Color from '../index';

const colorObject = (r, g, b, h, s, l, a) => ({
  a,
  b,
  g,
  h,
  l,
  r,
  s
});

test('throw error when called without new', () => {
  expect(() => Color()).toThrow(TypeError); // eslint-disable-line new-cap
});

test('props as getter/setter', () => {
  const color = new Color();
  const proto = Object.getPrototypeOf(color);
  const props = [
    'r', 'g', 'b', 'r16', 'g16', 'b16', 'h', 's', 'l', 'a',
    'rgb', 'rgba', 'hsl', 'hsla', 'hex'
  ];
  props.forEach(prop => {
    const d = Object.getOwnPropertyDescriptor(proto, prop);
    expect(typeof d.get).toEqual('function');
    expect(typeof d.set).toEqual('function');
  });
});

test('toObject', () => {
  const color = new Color();
  const proto = Object.getPrototypeOf(color);
  const d = Object.getOwnPropertyDescriptor(proto, 'toObject');
  expect(typeof d.value).toEqual('function');
});

test('toString', () => {
  const color = new Color();
  const proto = Object.getPrototypeOf(color);
  const d = Object.getOwnPropertyDescriptor(proto, 'toString');
  expect(typeof d.value).toEqual('function');
});

test('initialize to rgba(0, 0, 0, 1)', () => {
  const color = new Color();
  const expected = colorObject(0, 0, 0, 0, 0, 0, 1);
  expect(color.toObject()).toEqual(expected);
  expect(JSON.parse(color.toString())).toEqual(expected);
});

test('r', () => {
  const color = new Color();
  color.r = 127;
  expect(color.r).toEqual(127);
  expect(color.toObject()).toEqual(colorObject(127, 0, 0, 0, 100, 25, 1));
});

test('g', () => {
  const color = new Color();
  color.g = 127;
  expect(color.g).toEqual(127);
  expect(color.toObject()).toEqual(colorObject(0, 127, 0, 120, 100, 25, 1));
});

test('b', () => {
  const color = new Color();
  color.b = 127;
  expect(color.b).toEqual(127);
  expect(color.toObject()).toEqual(colorObject(0, 0, 127, 240, 100, 25, 1));
});

test('r16', () => {
  const color = new Color();
  color.r16 = '7f';
  expect(color.r16).toEqual('7f');
  expect(color.toObject()).toEqual(colorObject(127, 0, 0, 0, 100, 25, 1));
  color.r16 = 'f';
  expect(color.r16).toEqual('ff');
  expect(color.toObject()).toEqual(colorObject(255, 0, 0, 0, 100, 50, 1));
});

test('g16', () => {
  const color = new Color();
  color.g16 = '7f';
  expect(color.g16).toEqual('7f');
  expect(color.toObject()).toEqual(colorObject(0, 127, 0, 120, 100, 25, 1));
  color.g16 = 'f';
  expect(color.g16).toEqual('ff');
  expect(color.toObject()).toEqual(colorObject(0, 255, 0, 120, 100, 50, 1));
});

test('b16', () => {
  const color = new Color();
  color.b16 = '7f';
  expect(color.b16).toEqual('7f');
  expect(color.toObject()).toEqual(colorObject(0, 0, 127, 240, 100, 25, 1));
  color.b16 = 'f';
  expect(color.b16).toEqual('ff');
  expect(color.toObject()).toEqual(colorObject(0, 0, 255, 240, 100, 50, 1));
});

test('h', () => {
  const color = new Color();
  color.h = 180;
  color.s = 100;
  color.l = 50;
  expect(color.h).toEqual(180);
  expect(color.toObject()).toEqual(colorObject(0, 255, 255, 180, 100, 50, 1));
});

test('s', () => {
  const color = new Color();
  color.s = 50;
  color.l = 50;
  expect(color.s).toEqual(50);
  expect(color.toObject()).toEqual(colorObject(191, 64, 64, 0, 50, 50, 1));
});

test('l', () => {
  const color = new Color();
  color.l = 50;
  expect(color.l).toEqual(50);
  expect(color.toObject()).toEqual(colorObject(128, 128, 128, 0, 0, 50, 1));
});

test('a', () => {
  const color = new Color();
  color.a = 0.5;
  expect(color.a, 0.5);
  expect(color.toObject()).toEqual(colorObject(0, 0, 0, 0, 0, 0, 0.5));
});

test('rgb', () => {
  const color = new Color();
  color.rgb = 'rgb(255,127,0)';
  expect(color.rgb).toEqual('rgb(255, 127, 0)');
  expect(color.toObject()).toEqual(colorObject(255, 127, 0, 30, 100, 50, 1));
});

test('rgba', () => {
  const color = new Color();
  color.rgba = 'rgba(0,127,255,.5);';
  expect(color.rgba).toEqual('rgba(0, 127, 255, 0.5)');
  expect(color.toObject()).toEqual(colorObject(0, 127, 255, 210, 100, 50, 0.5));
});

test('hsl', () => {
  const color = new Color();
  color.hsl = 'hsl(120,100%,50%';
  expect(color.hsl).toEqual('hsl(120, 100%, 50%)');
  expect(color.toObject()).toEqual(colorObject(0, 255, 0, 120, 100, 50, 1));
});

test('hsla', () => {
  const color = new Color();
  color.hsla = '240,50,50,.5);';
  expect(color.hsla).toEqual('hsla(240, 50%, 50%, 0.5)');
  expect(color.toObject()).toEqual(colorObject(64, 64, 191, 240, 50, 50, 0.5));
});

test('hex', () => {
  const color = new Color();
  color.hex = '#00ff7f';
  expect(color.hex).toEqual('#00ff7f');
  expect(color.toObject()).toEqual(colorObject(0, 255, 127, 150, 100, 50, 1));
  color.hex = 'fa0';
  expect(color.hex).toEqual('#ffaa00');
  expect(color.toObject()).toEqual(colorObject(255, 170, 0, 40, 100, 50, 1));
});
