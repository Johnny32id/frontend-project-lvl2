import parser from './parsers';
import diff from './difference';
import lineBuildingFormat from './formater';

const genDiff = (pathToFirstFile, pathToSecondFile, format) => {
  const firstFile = parser(pathToFirstFile);
  const secondFile = parser(pathToSecondFile);
  const difference = diff(firstFile, secondFile);
  const toString = lineBuildingFormat(format, difference);
  return toString;
};
export default genDiff;
