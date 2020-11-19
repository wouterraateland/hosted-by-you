const getCurrentDataProps = ({ isCurrent, isPartiallyCurrent }) =>
  Object.entries({
    "data-current": isCurrent,
    "data-partially-current": isPartiallyCurrent,
  }).reduce(
    (acc, [key, value]) => (value ? { ...acc, [key]: value } : acc),
    {}
  );

const getScroll = (node) =>
  node
    ? {
        scrollTop: node.scrollTop,
        scrollLeft: node.scrollLeft,
      }
    : { scrollTop: 0, scrollLeft: 0 };

const getWindowScroll = () => getScroll(document.documentElement);

export { getScroll, getWindowScroll, getCurrentDataProps };
