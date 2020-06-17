import path from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff';

const getFixturePath = (filename) => path.join(__dirname, '..', '__tests__', '__fixtures__', filename);
const read = (pathToFile) => fs.readFileSync(getFixturePath(pathToFile), 'utf-8');
const flatResult = read('flatResult.txt');
const stylishResult = read('stylishResult.txt');
const plainResult = read('plainResult.txt');
const jsonResult = read('jsonResult.json');
test('stylishJSON', () => {
  expect(genDiff(getFixturePath('flatBefore.json'), getFixturePath('flatAfter.json'))).toEqual(flatResult);
  expect(genDiff(getFixturePath('nestedBefore.json'), getFixturePath('nestedAfter.json'))).toEqual(stylishResult);
});
test('stylishYML', () => {
  expect(genDiff(getFixturePath('flatBefore.yml'), getFixturePath('flatAfter.yml'))).toEqual(flatResult);
  expect(genDiff(getFixturePath('nestedBefore.yml'), getFixturePath('nestedAfter.yml'))).toEqual(stylishResult);
});
test('stylishINI', () => {
  expect(genDiff(getFixturePath('flatBefore.ini'), getFixturePath('flatAfter.ini'))).toEqual(flatResult);
  expect(genDiff(getFixturePath('nestedBefore.ini'), getFixturePath('nestedAfter.ini'))).toEqual(stylishResult);
});
test('plainFormat', () => {
  expect(genDiff(getFixturePath('nestedBefore.json'), getFixturePath('nestedAfter.json'), 'plain')).toEqual(plainResult);
  expect(genDiff(getFixturePath('nestedBefore.yml'), getFixturePath('nestedAfter.yml'), 'plain')).toEqual(plainResult);
  expect(genDiff(getFixturePath('nestedBefore.ini'), getFixturePath('nestedAfter.ini'), 'plain')).toEqual(plainResult);
});
test('JSONFormat', () => {
  expect(genDiff(getFixturePath('nestedBefore.json'), getFixturePath('nestedAfter.json'), 'json')).toEqual(jsonResult);
  expect(genDiff(getFixturePath('nestedBefore.yml'), getFixturePath('nestedAfter.yml'), 'json')).toEqual(jsonResult);
  expect(genDiff(getFixturePath('nestedBefore.ini'), getFixturePath('nestedAfter.ini'), 'json')).toEqual(jsonResult);
});
