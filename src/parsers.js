import yaml from 'js-yaml';
import iniParser from './iniParser';

const parse = (data, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.safeLoad(data);
    case '.ini':
      return iniParser(data);
    default:
      throw new Error(`Wrong file extension ${extension}`);
  }
};
export default parse;
