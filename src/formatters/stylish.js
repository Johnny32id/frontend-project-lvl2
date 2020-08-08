const indentation = (indent, sign = '') => {
  if (indent === 0) {
    return '';
  }
  const currectIndent = indent - sign.length;
  const result = `${' '.repeat(currectIndent)}${sign}`;
  return result;
};
const valueToString = (value, indent) => {
  if (typeof value === 'object') {
    const key = Object.keys(value);
    const result = `{\n${indentation(indent + 4)}${key}: ${value[key]}\n${indentation(indent)}}`;
    return result;
  }
  return value;
};
const formater = (arrayOfDifference) => {
  const lineBuilding = (changes, indent = 0) => {
    const arrayToString = changes.map((change) => {
      const {
        type, value, key, from, to, children,
      } = change;
      if (Array.isArray(children)) {
        return [`\n${indentation(indent + 4)}${key}: `, lineBuilding(children, indent + 4)];
      }
      switch (type) {
        case 'unchanged':
          return `\n${indentation(indent + 4)}${key}: ${valueToString(value, indent + 4)}`;
        case 'deleted':
          return `\n${indentation(indent + 4, '- ')}${key}: ${valueToString(value, indent + 4)}`;
        case 'added':
          return `\n${indentation(indent + 4, '+ ')}${key}: ${valueToString(value, indent + 4)}`;
        default:
          return `\n${indentation(indent + 4, '- ')}${key}: ${valueToString(from, indent + 4)}\n${indentation(indent + 4, '+ ')}${key}: ${valueToString(to, indent + 4)}`;
      }
    });
    return ['{', arrayToString, `\n${indentation(indent)}}`];
  };
  const result = lineBuilding(arrayOfDifference).flat(Infinity).join('');
  return result;
};
export default formater;
