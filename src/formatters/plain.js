import _ from 'lodash';

const currectedValue = (value) => {
  if (typeof value === 'object') {
    return '[complex value]';
  }
  return `'${value}'`;
};
const plain = (difference) => {
  const lineBuilding = (change, node = '') => {
    const build = change.map((item) => {
      const {
        type, key, value, from, to, children,
      } = item;
      if (_.has(item, 'children')) {
        return lineBuilding(children, `${node}${key}.`);
      }
      switch (type) {
        case 'deleted':
          return `Property '${node}${key}' was deleted`;
        case 'added':
          return `Property '${node}${key}' was added with value: ${currectedValue(value)}`;
        case 'changed':
          return `Property '${node}${key}' was changed from ${currectedValue(from)} to ${currectedValue(to)}`;
        default:
          return '';
      }
    });
    return build;
  };
  const result = lineBuilding(difference).flat(Infinity).filter((el) => el).join('\n');
  return result;
};
export default plain;
