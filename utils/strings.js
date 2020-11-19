import { either } from "./functions";

const capitalize = (s) =>
  s ? `${s.substr(0, 1).toUpperCase()}${s.substr(1)}` : "";

const lowerCase = (s) => s.toLowerCase();

const toContext = (contexts) =>
  contexts.flatMap(([key, value]) => (value ? [key] : [])).join("_") ||
  undefined;

const urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
const isURL = (s) => urlRegex.test(String(s).toLowerCase());

const cleanUrl = (s, removePath) =>
  either(
    () => {
      const url = new URL(s);
      const host = url.host.replace("www.", "");
      return removePath ? host : `${host}${url.pathname}`;
    },
    () =>
      (s || "")
        .replace("http://", "")
        .replace("https://", "")
        .replace("www.", "")
  );

const concatSentence = (items, connective) =>
  capitalize(
    items.reduce(
      (acc, item, i) =>
        acc
          .concat(
            i === 0 ? "" : i === items.length - 1 ? ` ${connective} ` : ", "
          )
          .concat(item),
      ""
    )
  );

// eslint-disable-next-line no-useless-escape
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const isEmail = (s) => emailRegex.test(String(s).toLowerCase());

const copyTextFallback = (text) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  const success = either(
    () => document.execCommand("copy"),
    () => false
  );

  document.body.removeChild(textArea);
  return success;
};

const copyTextModern = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    return false;
  }
};

const copyTextToClipboard = async (text) =>
  navigator.clipboard ? await copyTextModern(text) : copyTextFallback(text);

const formatLargeNumber = (n) =>
  n >= 1_000_000_000
    ? `${Math.round(n / 1_000_000_000)}B`
    : n >= 1_000_000
    ? `${Math.round(n / 1_000_000)}M`
    : n >= 1_000
    ? `${Math.round(n / 1_000)}K`
    : n;

export {
  capitalize,
  lowerCase,
  toContext,
  isURL,
  cleanUrl,
  isEmail,
  concatSentence,
  copyTextToClipboard,
  formatLargeNumber,
};
