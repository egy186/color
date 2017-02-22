const rgb2hsl = rgb255 => {
  const rgb = rgb255.map(n => n / 255);
  const max = Math.max(...rgb);
  const min = Math.min(...rgb);
  const sum = max + min;
  const delta = max - min;
  const l = sum * 50;
  if (delta === 0) {
    return [0, 0, Math.round(l)];
  }
  const [r, g, b] = rgb;
  let h = 0;
  let s = 0;
  switch (max) {
    case r:
      h = 60 * (g - b) / delta;
      break;
    case g:
      h = 120 + (60 * (b - r) / delta);
      break;
    case b:
      h = 240 + (60 * (r - g) / delta);
      break;
    // No default
  }
  if (h < 0) {
    h += 360;
  }
  if (l < 50) {
    s = delta * 100 / sum;
  } else {
    s = delta * 100 / (2 - sum);
  }
  return [h, s, l].map(Math.round);
};

export default rgb2hsl;
