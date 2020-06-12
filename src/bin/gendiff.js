#!/usr/bin/env node

import program from 'commander';
import genDiff from '../genDiff';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format [type] defaulting to stylish', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, format = 'stylish') => {
    const diff = genDiff(filepath1, filepath2, format);
    console.log(diff);
  })
  .parse(process.argv);

export default genDiff;
