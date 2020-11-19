const between = (min, max) => (x) => Math.max(min, Math.min(x, max));
const signed = (x) => (x > 0 ? `+${x}` : `${x}`);

export { between, signed };
