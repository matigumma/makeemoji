export default (context, saturation = 1) => {
  let amount = saturation / 100;
  if (amount === 1) return context;
  if (amount < 0) amount = 0;

  const { height, width } = context.canvas;
  const imageData = context.getImageData(0, 0, width, height);
  const { data } = imageData;
  const lumR = (1 - amount) * 0.3086;
  const lumG = (1 - amount) * 0.6094;
  const lumB = (1 - amount) * 0.082;
  const shiftW = width << 2;
  for (let j = 0; j < height; j++) {
    const offset = j * shiftW;
    for (let i = 0; i < width; i++) {
      const pos = offset + (i << 2);
      const r = data[pos + 0];
      const g = data[pos + 1];
      const b = data[pos + 2];
      data[pos + 0] = (lumR + amount) * r + lumG * g + lumB * b;
      data[pos + 1] = lumR * r + (lumG + amount) * g + lumB * b;
      data[pos + 2] = lumR * r + lumG * g + (lumB + amount) * b;
    }
  }

  context.putImageData(imageData, 0, 0);
  return context;
};
