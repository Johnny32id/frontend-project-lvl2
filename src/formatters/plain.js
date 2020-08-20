const stringify = (value) => {
  if (typeof value === 'object') {
    return '[complex value]';
  }
  return `'${value}'`;
};
const buildPlainFormat = (difference) => {
  const buildLine = (changes, ancestry = '') => {
    const build = changes.map((item) => {
      const {
        type, key, value, from, to, children,
      } = item;
      switch (type) {
        case 'tree':
          return buildLine(children, `${ancestry}${key}.`);
        case 'deleted':
          return `Property '${ancestry}${key}' was deleted`;
        case 'added':
          return `Property '${ancestry}${key}' was added with value: ${stringify(value)}`;
        case 'changed':
          return `Property '${ancestry}${key}' was changed from ${stringify(from)} to ${stringify(to)}`;
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
