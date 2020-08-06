export default () => {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  let R = r.toString(16);
  let G = g.toString(16);
  let B = b.toString(16);
  return `#${R}${G}${B}`;
};
