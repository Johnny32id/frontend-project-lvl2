const formater = (arrayOfDifference) => {
  const lineBuilding = (changes) => {
    let line = '';
    const { type } = changes;
    const { value } = changes;
    const { key } = changes;
    const { from } = changes;
    const { to } = changes;
    switch (type) {
      case 'scope':
        line += `    ${key}: ${value}\n`;
        break;
      case 'deleted':
        line += `  - ${key}: ${value}\n`;
        break;
      case 'added':
        line += `  + ${key}: ${value}\n`;
        break;
      default:
        line += `  - ${key}: ${from}\n  + ${key}: ${to}\n`;
    }
    return line;
  };
  const result = arrayOfDifference.map(lineBuilding);
  return result;
};
export default formater;
