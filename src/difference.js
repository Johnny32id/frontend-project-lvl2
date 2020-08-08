import _ from 'lodash';

const difference = (firstData, secondData) => {
  const keys = Object.keys({ ...firstData, ...secondData });
  const result = keys.map((key) => {
    const valueBefore = firstData[key];
    const valueAfter = secondData[key];
    if (_.has(firstData, key) && _.has(secondData, key)) {
      if (_.isObject(valueBefore) && _.isObject(valueAfter)) {
        return { key, type: 'unchanged', children: difference(valueBefore, valueAfter) };
      }
      if (valueBefore === valueAfter) {
        return { key, type: 'unchanged', value: valueBefore };
      }
      return {
        key, type: 'changed', from: valueBefore, to: valueAfter,
      };
    }
    if (!_.has(secondData, key)) {
      return { key, type: 'deleted', value: valueBefore };
    }
    return { key, type: 'added', value: valueAfter };
  });
  return result;
};
export default difference;
