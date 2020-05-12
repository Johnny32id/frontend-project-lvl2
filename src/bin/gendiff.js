#!/usr/bin/env node

const { program } = require('commander');
import genDiff from '../genDiff';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2))})
  .parse(process.argv);

export default genDiff;