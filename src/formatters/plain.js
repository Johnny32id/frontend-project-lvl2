const convertingValue = (value) => {
  if (typeof value === 'object') {
    return '[complex value]';
  }
  return `'${value}'`;
};
const buildPlainFormat = (difference) => {
  const buildLine = (change, node = '') => {
    const build = change.map((item) => {
      const {
        type, key, value, from, to, children,
      } = item;
      switch (type) {
        case 'tree':
          return buildLine(children, `${node}${key}.`);
        case 'deleted':
          return `Property '${node}${key}' was deleted`;
        case 'added':
          return `Property '${node}${key}' was added with value: ${convertingValue(value)}`;
        case 'changed':
          return `Property '${node}${key}' was changed from ${convertingValue(from)} to ${convertingValue(to)}`;
        case 'unchanged':
          return null;
        default:
          throw new Error(`Unsuitable type ${type}`);
      }
    });
    return build;
  };
  const result = buildLine(difference).flat(Infinity).filter((el) => el).join('\n');
  return result;
};
export default buildPlainFormat;
