import _ from 'lodash';

const convertingValue = (value) => {
  if (typeof value === 'object') {
    return '[complex value]';
  }
  return `'${value}'`;
};
const buildingPlainFormat = (difference) => {
  const stringConstruction = (change, node = '') => {
    const build = change.map((item) => {
      const {
        type, key, value, from, to, children,
      } = item;
      if (_.isArray(children)) {
        return stringConstruction(children, `${node}${key}.`);
      }
      switch (type) {
        case 'deleted':
          return `Property '${node}${key}' was deleted`;
        case 'added':
          return `Property '${node}${key}' was added with value: ${convertingValue(value)}`;
        case 'changed':
          return `Property '${node}${key}' was changed from ${convertingValue(from)} to ${convertingValue(to)}`;
        case 'unchanged':
          return '';
        default:
          throw new Error(`Unsuitable type ${type}`);
      }
    });
    return build;
  };
  const result = stringConstruction(difference).flat(Infinity).filter((el) => el).join('\n');
  return result;
};
export default buildingPlainFormat;
