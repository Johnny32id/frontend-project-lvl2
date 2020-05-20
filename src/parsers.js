import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parser = (pathToFile) => {
  if (path.extname(pathToFile) === '.json') {
    return JSON.parse(fs.readFileSync(pathToFile));
  }
  return yaml.safeLoad(fs.readFileSync(pathToFile));
};
export default parser;
