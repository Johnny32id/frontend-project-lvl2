import yaml from 'js-yaml';
import iniParser from './iniParser';

const parse = (data, extension) => {
  let parser;
  switch (extension) {
    case '.json':
      parser = JSON.parse;
      break;
    case '.yml':
      parser = yaml.safeLoad;
      break;
    default:
      parser = iniParser;
  }
  return parser(data);
};
export default parse;
