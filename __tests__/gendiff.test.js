import path from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff';

const getFixturePath = (filename) => path.join(__dirname, '..', '__tests__', '__fixtures__', filename);
const flatResult = fs.readFileSync(getFixturePath('flatResult.txt'), 'utf-8');
const stylishResult = fs.readFileSync(getFixturePath('stylishResult.txt'), 'utf-8');
const plainResult = fs.readFileSync(getFixturePath('plainResult.txt'), 'utf-8');
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
test('plainJSON', () => {
  expect(genDiff(getFixturePath('nestedBefore.json'), getFixturePath('nestedAfter.json'), 'plain')).toEqual(plainResult);
});
test('plainYML', () => {
  expect(genDiff(getFixturePath('nestedBefore.yml'), getFixturePath('nestedAfter.yml'), 'plain')).toEqual(plainResult);
});
test('plainINI', () => {
  expect(genDiff(getFixturePath('nestedBefore.ini'), getFixturePath('nestedAfter.ini'), 'plain')).toEqual(plainResult);
});
