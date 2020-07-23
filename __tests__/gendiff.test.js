import path from 'path';
import fs from 'fs';
import genDiff from '../index';

const getFixturePath = (filename) => path.join(__dirname, '..', '__tests__', '__fixtures__', filename);
const read = (pathToFile) => fs.readFileSync(getFixturePath(pathToFile), 'utf-8');
let stylishResult;
let plainResult;
let jsonResult;
let beforeJSON;
let beforeYML;
let beforeINI;
let afterJSON;
let afterYML;
let afterINI;
beforeAll(() => {
  stylishResult = read('stylishResult.txt');
  plainResult = read('plainResult.txt');
  jsonResult = read('jsonResult.json');
  beforeJSON = getFixturePath('before.json');
  beforeYML = getFixturePath('before.yml');
  beforeINI = getFixturePath('before.ini');
  afterJSON = getFixturePath('after.json');
  afterYML = getFixturePath('after.yml');
  afterINI = getFixturePath('after.ini');
});
test('stylishFormat', () => {
  expect(genDiff(beforeJSON, afterJSON)).toEqual(stylishResult);
  expect(genDiff(beforeYML, afterYML)).toEqual(stylishResult);
  expect(genDiff(beforeINI, afterINI)).toEqual(stylishResult);
});
test('plainFormat', () => {
  expect(genDiff(beforeJSON, afterJSON, 'plain')).toEqual(plainResult);
  expect(genDiff(beforeYML, afterYML, 'plain')).toEqual(plainResult);
  expect(genDiff(beforeINI, afterINI, 'plain')).toEqual(plainResult);
});
test('JSONFormat', () => {
  expect(genDiff(beforeJSON, afterJSON, 'json')).toEqual(jsonResult);
  expect(genDiff(beforeYML, afterYML, 'json')).toEqual(jsonResult);
  expect(genDiff(beforeINI, afterINI, 'json')).toEqual(jsonResult);
});
