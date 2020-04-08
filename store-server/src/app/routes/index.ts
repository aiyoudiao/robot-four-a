/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-01-08 09:36:34
 * @LastEditTime: 2020-03-25 23:45:02
 * @LastEditors: aiyoudiao
 * @FilePath: \my-robot\src\app\routes\index.ts
 */
import 'reflect-metadata';
import {createConnection} from 'typeorm';
import Router from 'koa-router';
import {ParameterizedContext} from 'koa';

const router = new Router();

createConnection()
  .then(value => console.log('连接成功！！！！！！！！！！！！'))
  .catch(reason => console.error('连接失败！！！！！！！！！！！！', reason));

router.get('/', async (ctx: ParameterizedContext) => {
  await ctx.render('index', {
    title: 'Welcome to robot-four-a nodejs api!',
  });
});
export default router;
