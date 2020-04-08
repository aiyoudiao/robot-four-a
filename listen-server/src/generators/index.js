
/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-04-03 22:51:36
 * @LastEditTime: 2020-04-03 22:52:06
 * @LastEditors: aiyoudiao
 * @FilePath: \my-robot\src\generators\index.js
 */
const componentGenerrator = require('./component/index.js');
const viewGenerrator = require('./view/index.js');
const storeGenerrator = require('./store/index.js');
const apiGenerrator = require('./api/index.js');

module.exports = plop => {
  plop.setGenerator('component', componentGenerrator);
  plop.setGenerator('views', viewGenerrator);
  plop.setGenerator('vuex', storeGenerrator);
  plop.setGenerator('api', apiGenerrator);
};
