import fs from 'fs';
import path from 'path';
import parse from './parsers';
import diff from './difference';
import format from './formatters/index';

const genDiff = (pathToFirstFile, pathToSecondFile, desiredFormat) => {
  const extension = path.extname(pathToFirstFile);
  const firstData = fs.readFileSync(pathToFirstFile, 'utf-8');
  const secondData = fs.readFileSync(pathToSecondFile, 'utf-8');
  const firstParsedData = parse(firstData, extension);
  const secondParsedData = parse(secondData, extension);
  const difference = diff(firstParsedData, secondParsedData);
  const toString = format(desiredFormat, difference);
  return toString;
};
export default genDiff;
