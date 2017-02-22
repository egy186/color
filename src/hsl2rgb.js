const hsl2rgb = hsl => {
  let [h, s, l] = hsl;
  while (h < 0) {
    h += 360;
  }
  while (h > 360) {
    h -= 360;
  }
  s /= 100;
  l /= 100;
  const c = s * (1 - Math.abs((2 * l) - 1));
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - (c / 2);
  let [r, g, b] = [m, m, m];
  if (h < 60) {
    r += c;
    g += x;
  } else if (h < 120) {
    r += x;
    g += c;
  } else if (h < 180) {
    g += c;
    b += x;
  } else if (h < 240) {
    g += x;
    b += c;
  } else if (h < 300) {
    r += x;
    b += c;
  } else {
    r += c;
    b += x;
  }
  if (s === 0) {
    [r, g, b] = [l, l, l];
  }
  return [r, g, b].map(n => Math.round(255 * n));
};

export default hsl2rgb;
