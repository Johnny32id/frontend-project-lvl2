const difference = (firstFile, secondFile) => {
  const allKeys = [...Object.keys(firstFile), ...Object.keys(secondFile)];
  const uniqueKeys = allKeys.filter((item, index) => allKeys.indexOf(item) === index);
  const result = uniqueKeys.reduce((acc, key) => {
    const valueBefore = firstFile[key];
    const valueAfter = secondFile[key];
    if (typeof valueBefore === 'object' && valueAfter === 'object') {
      acc.push({ name: key, type: 'scope', children: difference(valueBefore, valueAfter) });
    }
    if (valueBefore !== undefined && valueAfter !== undefined) {
      if (valueBefore === valueAfter) {
        acc.push({ name: key, type: 'scope', value: valueBefore });
      } else {
        acc.push({
          name: key, type: 'changed', from: valueBefore, to: valueAfter,
        });
      }
    }
    if (valueBefore !== undefined && valueAfter === undefined) {
      acc.push({ name: key, type: 'deleted', value: valueBefore });
    }
    if (valueBefore === undefined && valueAfter !== undefined) {
      acc.push({ name: key, type: 'added', value: valueAfter });
    }
    return acc;
  }, []);
  return result;
};
export default difference;
