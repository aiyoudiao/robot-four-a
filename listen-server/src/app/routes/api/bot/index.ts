/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-10 11:33:01
 * @LastEditTime: 2020-04-05 14:38:30
 * @LastEditors: aiyoudiao
 * @FilePath: \project\listen-server\src\app\routes\api\bot\index.ts
 */

import { start } from '@ormController/index';
// import { table, searchByFormData } from '@ormController/group-record-controller';
// import { table, searchByFormData } from '@ormController/log-group-message-content-controller';
// import { sendMessage, receiveMessage } from '@ormController/test-rabbitmq-controller';

 import Router from 'koa-router';
 const router = new Router();
 router.prefix('/bot/');

 router.get('/start', start);
//  router.get('/table', table);
//  router.get('/searchByFormData', searchByFormData);
//  router.get('/sendMessage', sendMessage);
//  router.get('/receiveMessage', receiveMessage);
//  router.use(user.routes(), user.allowedMethods());
//  router.use(project.routes(), project.allowedMethods());

 router.get('/', async ctx => {
   ctx.body = 'api/bot';
 });

 export default router;
