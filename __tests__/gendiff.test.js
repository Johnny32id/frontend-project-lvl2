import path from 'path';
import fs from 'fs';
import genDiff from '../index';

const getFixturePath = (filename) => path.join(__dirname, '..', '__tests__', '__fixtures__', filename);
const read = (pathToFile) => fs.readFileSync(getFixturePath(pathToFile), 'utf-8');
test.each([
  ['before.json', 'after.json', 'stylish', 'stylishResult.txt'],
  ['before.yml', 'after.yml', 'plain', 'plainResult.txt'],
  ['before.ini', 'after.ini', 'json', 'jsonResult.json'],
])('genDiff', (before, after, format, result) => {
  expect(genDiff(getFixturePath(before), getFixturePath(after), format)).toEqual(read(result));
});
