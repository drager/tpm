#!/usr/bin/env node
'use strict';

var fs = require('fs');
var path = require('path');
var program = require('commander');
var tpm = require('../src/index');

program.version(JSON.parse(fs.readFileSync(__dirname + '/../package.json', 'utf8')).version)
       .command('install')
       .description('install typings from the typings.yaml file')
       .action(() => {
         tpm().then(() => process.exit(0));
       });

program.name = 'tpm';
program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
