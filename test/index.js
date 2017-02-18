import Color from '../src/index';
import test from 'ava';

const colorObject = (r, g, b, h, s, l, a) => ({
  a,
  b,
  g,
  h,
  l,
  r,
  s
});

test('throw error when called without new', t => {
  t.throws(() => Color(), TypeError); // eslint-disable-line new-cap
});

test('props as getter/setter', t => {
  const color = new Color();
  const proto = Object.getPrototypeOf(color);
  const props = [
    'r', 'g', 'b', 'r16', 'g16', 'b16', 'h', 's', 'l', 'a',
    'rgb', 'rgba', 'hsl', 'hsla', 'hex'
  ];
  props.forEach(prop => {
    const d = Object.getOwnPropertyDescriptor(proto, prop);
    t.deepEqual(typeof d.get, 'function');
    t.deepEqual(typeof d.set, 'function');
  });
});

test('toObject', t => {
  const color = new Color();
  const proto = Object.getPrototypeOf(color);
  const d = Object.getOwnPropertyDescriptor(proto, 'toObject');
  t.deepEqual(typeof d.value, 'function');
});

test('toString', t => {
  const color = new Color();
  const proto = Object.getPrototypeOf(color);
  const d = Object.getOwnPropertyDescriptor(proto, 'toString');
  t.deepEqual(typeof d.value, 'function');
});

test('initialize to rgba(0, 0, 0, 1)', t => {
  const color = new Color();
  const expected = colorObject(0, 0, 0, 0, 0, 0, 1);
  t.deepEqual(color.toObject(), expected);
  t.deepEqual(JSON.parse(color.toString()), expected);
});

test('r', t => {
  const color = new Color();
  color.r = 127;
  t.deepEqual(color.r, 127);
  t.deepEqual(color.toObject(), colorObject(127, 0, 0, 0, 100, 25, 1));
});

test('g', t => {
  const color = new Color();
  color.g = 127;
  t.deepEqual(color.g, 127);
  t.deepEqual(color.toObject(), colorObject(0, 127, 0, 120, 100, 25, 1));
});

test('b', t => {
  const color = new Color();
  color.b = 127;
  t.deepEqual(color.b, 127);
  t.deepEqual(color.toObject(), colorObject(0, 0, 127, 240, 100, 25, 1));
});

test('r16', t => {
  const color = new Color();
  color.r16 = '7f';
  t.deepEqual(color.r16, '7f');
  t.deepEqual(color.toObject(), colorObject(127, 0, 0, 0, 100, 25, 1));
  color.r16 = 'f';
  t.deepEqual(color.r16, 'ff');
  t.deepEqual(color.toObject(), colorObject(255, 0, 0, 0, 100, 50, 1));
});

test('g16', t => {
  const color = new Color();
  color.g16 = '7f';
  t.deepEqual(color.g16, '7f');
  t.deepEqual(color.toObject(), colorObject(0, 127, 0, 120, 100, 25, 1));
  color.g16 = 'f';
  t.deepEqual(color.g16, 'ff');
  t.deepEqual(color.toObject(), colorObject(0, 255, 0, 120, 100, 50, 1));
});

test('b16', t => {
  const color = new Color();
  color.b16 = '7f';
  t.deepEqual(color.b16, '7f');
  t.deepEqual(color.toObject(), colorObject(0, 0, 127, 240, 100, 25, 1));
  color.b16 = 'f';
  t.deepEqual(color.b16, 'ff');
  t.deepEqual(color.toObject(), colorObject(0, 0, 255, 240, 100, 50, 1));
});

test('h', t => {
  const color = new Color();
  color.h = 180;
  color.s = 100;
  color.l = 50;
  t.deepEqual(color.h, 180);
  t.deepEqual(color.toObject(), colorObject(0, 255, 255, 180, 100, 50, 1));
});

test('s', t => {
  const color = new Color();
  color.s = 50;
  color.l = 50;
  t.deepEqual(color.s, 50);
  t.deepEqual(color.toObject(), colorObject(191, 64, 64, 0, 50, 50, 1));
});

test('l', t => {
  const color = new Color();
  color.l = 50;
  t.deepEqual(color.l, 50);
  t.deepEqual(color.toObject(), colorObject(128, 128, 128, 0, 0, 50, 1));
});

test('a', t => {
  const color = new Color();
  color.a = 0.5;
  t.deepEqual(color.a, 0.5);
  t.deepEqual(color.toObject(), colorObject(0, 0, 0, 0, 0, 0, 0.5));
});

test('rgb', t => {
  const color = new Color();
  color.rgb = 'rgb(255,127,0)';
  t.deepEqual(color.rgb, 'rgb(255, 127, 0)');
  t.deepEqual(color.toObject(), colorObject(255, 127, 0, 30, 100, 50, 1));
});

test('rgba', t => {
  const color = new Color();
  color.rgba = 'rgba(0,127,255,.5);';
  t.deepEqual(color.rgba, 'rgba(0, 127, 255, 0.5)');
  t.deepEqual(color.toObject(), colorObject(0, 127, 255, 210, 100, 50, 0.5));
});

test('hsl', t => {
  const color = new Color();
  color.hsl = 'hsl(120,100%,50%';
  t.deepEqual(color.hsl, 'hsl(120, 100%, 50%)');
  t.deepEqual(color.toObject(), colorObject(0, 255, 0, 120, 100, 50, 1));
});

test('hsla', t => {
  const color = new Color();
  color.hsla = '240,50,50,.5);';
  t.deepEqual(color.hsla, 'hsla(240, 50%, 50%, 0.5)');
  t.deepEqual(color.toObject(), colorObject(64, 64, 191, 240, 50, 50, 0.5));
});

test('hex', t => {
  const color = new Color();
  color.hex = '#00ff7f';
  t.deepEqual(color.hex, '#00ff7f');
  t.deepEqual(color.toObject(), colorObject(0, 255, 127, 150, 100, 50, 1));
  color.hex = 'fa0';
  t.deepEqual(color.hex, '#ffaa00');
  t.deepEqual(color.toObject(), colorObject(255, 170, 0, 40, 100, 50, 1));
});
