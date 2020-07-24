import ini from 'ini';
import _, { isObject } from 'lodash';

const checkValue = (item) => {
  if (item === true || item === false) {
    return item;
  }
  if (isObject(item)) {
    return _.mapValues(item, checkValue);
  }
  if (Number.isFinite(Number(item))) {
    return Number(item);
  }
  return item;
};
const iniParser = (data) => {
  const parsed = ini.parse(data);
  const currectParsed = _.mapValues(parsed, checkValue);
  return currectParsed;
};
export default iniParser;
