const identity = (x) => x;
const noop = () => {};
const constant = (x) => () => x;
const compose = (...args) => (x) => args.reduceRight((v, f) => f(v), x);
const pipe = (...args) => (x) => args.reduce((v, f) => f(v), x);
const is = (x) => (y) => x === y;
const isNull = (x) => x === null;
const isNotNull = (x) => x !== null;
const isJust = (x) => x !== null && x !== undefined;
const isNothing = (x) => x === null || x === undefined;
const not = (x) => !x;
const map = (f) => (x) => f(x);
const neg = (f) => (x) => !f(x);
const and = (f, g) => (x) => f(x) && g(x);
const or = (f, g) => (x) => f(x) || g(x);

const either = (f, g) => {
  try {
    return f();
  } catch (error) {
    return g();
  }
};

const log = (x) => {
  console.log(x);
  return x;
};

export {
  identity,
  noop,
  constant,
  compose,
  pipe,
  is,
  isNull,
  isNotNull,
  isJust,
  isNothing,
  not,
  map,
  neg,
  and,
  or,
  either,
  log,
};
