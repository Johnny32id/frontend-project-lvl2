import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parser = (pathToFile) => {
  const format = path.extname(pathToFile);
  const data = fs.readFileSync(pathToFile, 'utf-8');
  let parse;
  switch (format) {
    case '.json':
      parse = JSON.parse;
      break;
    case '.yml':
      parse = yaml.safeLoad;
      break;
    default:
      parse = ini.parse;
  }
  return parse(data);
};
export default parser;
