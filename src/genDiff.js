import fs from 'fs';
import path from 'path';
import parse from './parsers';
import diff from './difference';
import format from './formatters/index';

const genDiff = (pathToFirstFile, pathToSecondFile, desiredFormat) => {
  const extension = path.extname(pathToFirstFile);
  const firstFileData = fs.readFileSync(pathToFirstFile, 'utf-8');
  const secondFileData = fs.readFileSync(pathToSecondFile, 'utf-8');
  const parsedFirstFile = parse(firstFileData, extension);
  const parsedSecondFile = parse(secondFileData, extension);
  const difference = diff(parsedFirstFile, parsedSecondFile);
  const toString = format(desiredFormat, difference);
  return toString;
};
export default genDiff;
