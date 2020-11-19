import { getKey } from "./objects";

const chooseRandom = (xs) => xs[Math.floor(Math.random() * xs.length)];

const chooseNRandom = (xs, n) =>
  xs
    .slice()
    .sort(() => 0.5 - Math.random())
    .slice(0, n);

const unique = (xs) =>
  xs.reduce((acc, x) => (acc.includes(x) ? acc : [...acc, x]), []);
const uniqueBy = (f) => (xs) =>
  xs.reduce(
    (acc, x) => (acc.some((y) => f(x) === f(y)) ? acc : [...acc, x]),
    []
  );
const uniqueByKey = (key) => uniqueBy(getKey(key));

const zipWith = (f) => (xs, ys) => xs.map((x, i) => f(x, ys[i]));
const zip = zipWith((x, y) => [x, y]);

const intersection = (xs, ys) => xs.filter((x) => ys.some((y) => y === x));
const intersectionBy = (f) => (xs, ys) =>
  xs.filter((x) => ys.some((y) => f(y) === f(x)));
const intersectionByKey = (key) => intersectionBy(getKey(key));

const union = (xs, ys) => unique(xs.concat(ys));
const unionBy = (f) => (xs, ys) => uniqueBy(f)(xs.concat(ys));
const unionByKey = (key) => (xs, ys) => uniqueByKey(key)(xs.concat(ys));

const setMinus = (xs, ys) => xs.filter((x) => !ys.some((y) => y === x));
const setMinusBy = (f) => (xs, ys) =>
  xs.filter((x) => !ys.some((y) => f(y) === f(x)));
const setMinusByKey = (key) => setMinusBy(getKey(key));

const difference = (xs, ys) => union(setMinus(xs, ys), setMinus(ys, xs));
const differenceBy = (f) => (xs, ys) =>
  unionBy(f)(setMinusBy(f)(xs, ys), setMinusBy(f)(ys, xs));
const differenceByKey = (key) => differenceBy(getKey(key));

const chunk = (n) => (xs) =>
  Array(Math.ceil(xs.length / n))
    .fill()
    .map((_, i) => xs.slice(i * n, (i + 1) * n));

const baseCompare = (a, b) =>
  typeof a === "string" && typeof b === "string" ? a.localeCompare(b) : a - b;
const firstBy = (f, dir = 1) => (a, b) => dir * baseCompare(f(a), f(b));

const groupBy = (f) => (xs) =>
  xs.reduce((groups, x) => {
    const group = f(x);
    return {
      ...groups,
      [group]: [...(groups[group] || []), x],
    };
  }, {});
const groupByKey = (key) => groupBy(getKey(key));

const replace = (xs, i, x) => {
  const ys = xs.slice();
  ys[i] = x;
  return ys;
};

export {
  chooseRandom,
  chooseNRandom,
  unique,
  uniqueBy,
  uniqueByKey,
  zipWith,
  zip,
  intersection,
  intersectionBy,
  intersectionByKey,
  union,
  unionBy,
  unionByKey,
  setMinus,
  setMinusBy,
  setMinusByKey,
  difference,
  differenceBy,
  differenceByKey,
  chunk,
  firstBy,
  groupBy,
  groupByKey,
  replace,
};
