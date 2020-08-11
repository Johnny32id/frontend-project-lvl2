import _ from 'lodash';

const indentation = (indent, sign = '') => {
  if (indent === 0) {
    return '';
  }
  const desiredIndent = indent - sign.length;
  const result = `${' '.repeat(desiredIndent)}${sign}`;
  return result;
};
const valueToString = (value, indent) => {
  if (!_.isObject(value)) {
    return value;
  }
  const key = Object.keys(value);
  const result = `{\n${indentation(indent + 4)}${key}: ${value[key]}\n${indentation(indent)}}`;
  return result;
};
const formater = (arrayOfDifference) => {
  const stringConstruction = (changes, indent = 0) => {
    const arrayToString = changes.map((change) => {
      const {
        type, value, key, from, to, children,
      } = change;
      if (_.isArray(children)) {
        return [`${indentation(indent + 4)}${key}: {`, stringConstruction(children, indent + 4), `${indentation(indent + 4)}}`];
      }
      switch (type) {
        case 'unchanged':
          return `${indentation(indent + 4)}${key}: ${valueToString(value, indent + 4)}`;
        case 'deleted':
          return `${indentation(indent + 4, '- ')}${key}: ${valueToString(value, indent + 4)}`;
        case 'added':
          return `${indentation(indent + 4, '+ ')}${key}: ${valueToString(value, indent + 4)}`;
        case 'changed':
          return [`${indentation(indent + 4, '- ')}${key}: ${valueToString(from, indent + 4)}`, `${indentation(indent + 4, '+ ')}${key}: ${valueToString(to, indent + 4)}`];
        default:
          throw new Error(`Unsuitable type ${type}`);
      }
    });
    return arrayToString;
  };
  const result = ['{', stringConstruction(arrayOfDifference), '}'].flat(Infinity).join('\n');
  return result;
};
export default formater;
