const checkValue = (item) => {
  if (item === true || item === false) {
    return item;
  }
  if (typeof item === 'object') {
    const newItem = item;
    const key = Object.keys(newItem);
    newItem[key] = checkValue(newItem[key]);
    return newItem;
  }
  if (Number.isFinite(Number(item))) {
    return Number(item);
  }
  return item;
};
const difference = (firstFile, secondFile) => {
  const allKeys = [...Object.keys(firstFile), ...Object.keys(secondFile)];
  const uniqueKeys = allKeys.filter((item, index) => allKeys.indexOf(item) === index);
  const result = uniqueKeys.reduce((acc, name) => {
    const valueBefore = firstFile[name];
    const valueAfter = secondFile[name];
    if (typeof valueBefore === 'object' && typeof valueAfter === 'object') {
      acc.push({ key: name, type: 'not changed', children: difference(valueBefore, valueAfter) });
    } else {
      if (valueBefore !== undefined && valueAfter !== undefined) {
        if (valueBefore === valueAfter) {
          acc.push({ key: name, type: 'not changed', value: checkValue(valueBefore) });
        } else {
          acc.push({
            key: name, type: 'changed', from: checkValue(valueBefore), to: checkValue(valueAfter),
          });
        }
      }
      if (valueBefore !== undefined && valueAfter === undefined) {
        acc.push({ key: name, type: 'deleted', value: checkValue(valueBefore) });
      }
      if (valueBefore === undefined && valueAfter !== undefined) {
        acc.push({ key: name, type: 'added', value: checkValue(valueAfter) });
      }
    }
    return acc;
  }, []);
  return result;
};
export default difference;
