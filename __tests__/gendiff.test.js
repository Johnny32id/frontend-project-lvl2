import path from 'path';
import genDiff from '../src/genDiff';

const result = '{\n    host: hexlet.io\n  - timeout: 50\n  + timeout: 20\n  - proxy: 123.234.53.22\n  - follow: false\n  + verbose: true\n}';
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
test('gendiffJSON', () => {
  const firstFileJson = getFixturePath('before.json');
  const secondFileJson = getFixturePath('after.json');
  expect(genDiff(firstFileJson, secondFileJson)).toEqual(result);
});
test('gendiffYML', () => {
  const firstFileYml = getFixturePath('before.yml');
  const secondFileYml = getFixturePath('after.yml');
  expect(genDiff(firstFileYml, secondFileYml)).toEqual(result);
});
test('gendiffINI', () => {
  const firstFileINI = getFixturePath('before.ini');
  const secondFileINI = getFixturePath('after.ini');
  expect(genDiff(firstFileINI, secondFileINI)).toEqual(result);
});
