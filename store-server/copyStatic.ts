/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-01-08 09:36:34
 * @LastEditTime: 2020-03-12 11:48:02
 * @LastEditors: aiyoudiao
 * @FilePath: \my-robot\copyStatic.ts
 */
import * as shell from 'shelljs';
shell.cp('-R', './src/assets', './dist/src');
shell.cp('-R', 'package.json', './dist/package.json');
shell.cp('-R', 'tsconfig.json', './dist/tsconfig.json');
shell.cp('-R', 'ormconfig.js', './dist/ormconfig.js');
shell.rm('-R', './dist/test');
