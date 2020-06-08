const difference = (firstFile, secondFile) => {
  const allKeys = [...Object.keys(firstFile), ...Object.keys(secondFile)];
  const uniqueKeys = allKeys.filter((item, index) => allKeys.indexOf(item) === index);
  const result = uniqueKeys.reduce((acc, name) => {
    const valueBefore = firstFile[name];
    const valueAfter = secondFile[name];
    if (typeof valueBefore === 'object' && typeof valueAfter === 'object') {
      acc.push({ key: name, type: 'scope', children: difference(valueBefore, valueAfter) });
    } else {
      if (valueBefore !== undefined && valueAfter !== undefined) {
        if (valueBefore === valueAfter) {
          acc.push({ key: name, type: 'scope', value: valueBefore });
        } else {
          acc.push({
            key: name, type: 'changed', from: valueBefore, to: valueAfter,
          });
        }
      }
      if (valueBefore !== undefined && valueAfter === undefined) {
        acc.push({ key: name, type: 'deleted', value: valueBefore });
      }
      if (valueBefore === undefined && valueAfter !== undefined) {
        acc.push({ key: name, type: 'added', value: valueAfter });
      }
    }
    return acc;
  }, []);
  return result;
};
export default difference;
