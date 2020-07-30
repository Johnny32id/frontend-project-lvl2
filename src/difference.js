import _ from 'lodash';

const difference = (firstFile, secondFile) => {
  const keysFromFirstFile = Object.keys(firstFile);
  const keysFromSecondFile = Object.keys(secondFile);
  const allKeys = keysFromFirstFile.concat(keysFromSecondFile);
  const uniqueKeys = allKeys.filter((item, index) => allKeys.indexOf(item) === index);
  const result = uniqueKeys.reduce((acc, name) => {
    const keyName = name;
    const valueBefore = firstFile[name];
    const valueAfter = secondFile[name];
    if (_.isObject(valueBefore) && _.isObject(valueAfter)) {
      acc.push({ key: keyName, type: 'not changed', children: difference(valueBefore, valueAfter) });
    } else {
      if (keysFromFirstFile.includes(keyName) && keysFromSecondFile.includes(keyName)) {
        if (valueBefore === valueAfter) {
          acc.push({ key: keyName, type: 'not changed', value: valueBefore });
        } else {
          acc.push({
            key: keyName, type: 'changed', from: valueBefore, to: valueAfter,
          });
        }
      }
      if (!keysFromSecondFile.includes(keyName)) {
        acc.push({ key: keyName, type: 'deleted', value: valueBefore });
      }
      if (!keysFromFirstFile.includes(keyName)) {
        acc.push({ key: keyName, type: 'added', value: valueAfter });
      }
    }
    return acc;
  }, []);
  return result;
};
export default difference;
