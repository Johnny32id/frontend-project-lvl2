import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parser = (pathToFile) => {
  if (path.extname(pathToFile) === '.json') {
    return JSON.parse(fs.readFileSync(pathToFile));
  }
  if (path.extname(pathToFile) === '.yml') {
    return yaml.safeLoad(fs.readFileSync(pathToFile));
  }
  return ini.parse(fs.readFileSync(pathToFile, 'utf-8'));
};
export default parser;
