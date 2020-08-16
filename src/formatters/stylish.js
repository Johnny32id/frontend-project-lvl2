import _ from 'lodash';

const indentLine = (indent, sign = '') => {
  if (indent === 0) {
    return '';
  }
  const desiredIndent = indent - sign.length;
  const result = `${' '.repeat(desiredIndent)}${sign}`;
  return result;
};
const convertValueToString = (value, indent) => {
  if (!_.isObject(value)) {
    return value;
  }
  const key = Object.keys(value);
  const result = `{\n${indentLine(indent + 4)}${key}: ${value[key]}\n${indentLine(indent)}}`;
  return result;
};
const buildStylishFormat = (difference) => {
  const buildLine = (changes, indent = 0) => {
    const arrayToString = changes.map((change) => {
      const {
        type, value, key, from, to, children,
      } = change;
      switch (type) {
        case 'tree':
          return [`${indentLine(indent + 4)}${key}: {`, buildLine(children, indent + 4), `${indentLine(indent + 4)}}`];
        case 'unchanged':
          return `${indentLine(indent + 4)}${key}: ${convertValueToString(value, indent + 4)}`;
        case 'deleted':
          return `${indentLine(indent + 4, '- ')}${key}: ${convertValueToString(value, indent + 4)}`;
        case 'added':
          return `${indentLine(indent + 4, '+ ')}${key}: ${convertValueToString(value, indent + 4)}`;
        case 'changed':
          return [`${indentLine(indent + 4, '- ')}${key}: ${convertValueToString(from, indent + 4)}`, `${indentLine(indent + 4, '+ ')}${key}: ${convertValueToString(to, indent + 4)}`];
        default:
          throw new Error(`Unsuitable type ${type}`);
      }
    });
    return arrayToString;
  };
  const result = ['{', buildLine(difference), '}'].flat(Infinity).join('\n');
  return result;
};
export default buildStylishFormat;
