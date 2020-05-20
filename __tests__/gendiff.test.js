import path from 'path';
import gendiff from '../src/genDiff';

const result = '{\n    host: hexlet.io\n  - timeout: 50\n  + timeout: 20\n  - proxy: 123.234.53.22\n  - follow: false\n  + verbose: true\n}';
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
test('gendiffJSON', () => {
  const firstFileJson = getFixturePath('before.json');
  const secondFileJson = getFixturePath('after.json');
  expect(gendiff(firstFileJson, secondFileJson)).toEqual(result);
});
test('gendiffYML', () => {
  const firstFileYml = getFixturePath('before.yml');
  const secondFileYml = getFixturePath('after.yml');
  expect(gendiff(firstFileYml, secondFileYml)).toEqual(result);
});
