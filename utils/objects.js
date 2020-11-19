/*  Function to test if an object is a plain object, i.e. is constructed
 *  by the built-in Object constructor and inherits directly from Object.prototype
 *  or null. Some built-in objects pass the test, e.g. Math which is a plain object
 *  and some host or exotic objects may pass also.
 *
 *  @param {} obj - value to test
 *  @returns {Boolean} true if passes tests, false otherwise
 */
const isPlainObject = (obj) => {
  // Basic check for Type object that's not null
  if (typeof obj == "object" && obj !== null) {
    // If Object.getPrototypeOf supported, use it
    if (typeof Object.getPrototypeOf == "function") {
      const proto = Object.getPrototypeOf(obj);
      return proto === Object.prototype || proto === null;
    }

    // Otherwise, use internal class
    // This should be reliable as if getPrototypeOf not supported, is pre-ES5
    return Object.prototype.toString.call(obj) === "[object Object]";
  }

  // Not an object
  return false;
};

const getKey = (key, splitOn = ".") => (o) =>
  key.split(splitOn).reduce((v, k) => (v ? v[k] : undefined), o);

const _setKey = (parts, value, o) =>
  parts.length === 0
    ? value
    : {
        ...o,
        [parts[0]]: _setKey(parts.slice(1), value, o[parts[0]] || {}),
      };

const setKey = (key, value, splitOn = ".") => (o) =>
  _setKey(key.split(splitOn), value, o);

const arrayLikeToArray = (o) => {
  if (typeof o !== "object" || !o) {
    return o;
  }
  const keys = Object.keys(o);
  return keys.some(isNaN)
    ? keys.reduce(
        (acc, key) => ({ ...acc, [key]: arrayLikeToArray(o[key]) }),
        {}
      )
    : keys.reduce((acc, key) => {
        const res = acc.slice();
        res[Number(key)] = arrayLikeToArray(o[Number(key)]);
        return res;
      }, []);
};

const pruneObject = (obj) =>
  isPlainObject(obj)
    ? Object.keys(obj)
        .filter((k) => obj[k] !== undefined)
        .reduce(
          (newObj, k) =>
            Array.isArray(obj[k])
              ? {
                  ...newObj,
                  [k]: obj[k].filter((v) => v !== undefined).map(pruneObject),
                }
              : typeof obj[k] === "object"
              ? { ...newObj, [k]: pruneObject(obj[k]) }
              : { ...newObj, [k]: obj[k] },
          {}
        )
    : obj;

export { isPlainObject, getKey, setKey, arrayLikeToArray, pruneObject };
