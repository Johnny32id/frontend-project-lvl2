import path from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const resultFlat = fs.readFileSync(getFixturePath('flatResult.txt'), 'utf-8');
const resultNested = fs.readFileSync(getFixturePath('nestedResult.txt'), 'utf-8');
test('flatJSON', () => {
  const firstFlatFileJson = getFixturePath('flatBefore.json');
  const secondFlatFileJson = getFixturePath('flatAfter.json');
  expect(genDiff(firstFlatFileJson, secondFlatFileJson)).toEqual(resultFlat);
});
test('flatYML', () => {
  const firstFileYml = getFixturePath('flatBefore.yml');
  const secondFileYml = getFixturePath('flatAfter.yml');
  expect(genDiff(firstFileYml, secondFileYml)).toEqual(resultFlat);
});
test('flatINI', () => {
  const firstFileINI = getFixturePath('flatBefore.ini');
  const secondFileINI = getFixturePath('flatAfter.ini');
  expect(genDiff(firstFileINI, secondFileINI)).toEqual(resultFlat);
});
test('nestedJSON', () => {
  const firstNestedFileJson = getFixturePath('nestedBefore.json');
  const secondNestedFileJson = getFixturePath('nestedAfter.json');
  expect(genDiff(firstNestedFileJson, secondNestedFileJson)).toEqual(resultNested);
});
