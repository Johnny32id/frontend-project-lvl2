import parser from './parsers';
import diff from './difference';
import stylish from './stylish';

const genDiff = (pathToFirstFile, pathToSecondFile) => {
  const firstFile = parser(pathToFirstFile);
  const secondFile = parser(pathToSecondFile);
  const difference = diff(firstFile, secondFile);
  const toString = stylish(difference);
  return difference;
};
export default genDiff;
