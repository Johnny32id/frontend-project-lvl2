const formater = (arrayOfDifference) => {
  const lineBuilding = (changes) => {
    const arrayToString = changes.reduce((acc, change) => {
      const {
        type, value, key, from, to, children,
      } = change;
      if (Array.isArray(children)) {
        acc.push((`    ${key}: ${lineBuilding(children)}`));
      } else {
        switch (type) {
          case 'scope':
            acc.push(`    ${key}: ${value}\n`);
            break;
          case 'deleted':
            acc.push(`  - ${key}: ${value}\n`);
            break;
          case 'added':
            acc.push(`  + ${key}: ${value}\n`);
            break;
          default:
            acc.push(`  - ${key}: ${from}\n`);
            acc.push(`  + ${key}: ${to}\n`);
        }
      }
      return acc;
    }, []);
    return ['{\n', arrayToString, '}'];
  };
  const result = lineBuilding(arrayOfDifference).flat(Infinity).join('');
  return result;
};
export default formater;
