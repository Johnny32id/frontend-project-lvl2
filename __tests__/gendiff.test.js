import path from 'path';
import genDiff from '../src/genDiff';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const result = '{\n    host: hexlet.io\n  - timeout: 50\n  + timeout: 20\n  - proxy: 123.234.53.22\n  - follow: false\n  + verbose: true\n}';
test('gendiff', () => {
  const pathToFirstFile = getFixturePath('before.json');
  const pathToSecondFile = getFixturePath('after.json');
  expect(genDiff(pathToFirstFile, pathToSecondFile)).toEqual(result);
});
