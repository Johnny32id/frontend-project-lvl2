const currectedValue = (value) => {
  if (typeof value === 'object') {
    return '[complex value]';
  }
  return `'${value}'`;
};
const plain = (difference) => {
  const lineBuilding = (change, name = '') => {
    const build = change.reduce((acc, item) => {
      const {
        type, key, value, from, to, children,
      } = item;
      if (Array.isArray(children)) {
        acc.push([lineBuilding(children, `${name}${key}.`)]);
      } else {
        if (type === 'deleted') {
          acc.push(`Property '${name}${key}' was deleted`);
        }
        if (type === 'added') {
          acc.push(`Property '${name}${key}' was added with value: ${currectedValue(value)}`);
        }
        if (type === 'changed') {
          acc.push(`Property '${name}${key}' was changed from ${currectedValue(from)} to ${currectedValue(to)}`);
        }
      }
      return acc;
    }, []);
    return build;
  };
  const result = lineBuilding(difference).flat(Infinity).join('\n');
  return result;
};
export default plain;
