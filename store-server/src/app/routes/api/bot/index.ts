/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-10 11:33:01
 * @LastEditTime: 2020-04-05 15:17:42
 * @LastEditors: aiyoudiao
 * @FilePath: \project\store-server\src\app\routes\api\bot\index.ts
 */

import { start } from '@ormController/index';
// import { table, searchByFormData } from '@ormController/group-record-controller';
// import { currentBotInfo } from '@ormController/bot-info-controller';
// import { getBotFriendList } from '@ormController/bot-friend-controller';

 import Router from 'koa-router';
 const router = new Router();
 router.prefix('/bot/');

 router.get('/start', start);
//  router.get('/table', table);
//  router.get('/searchByFormData', searchByFormData);
//  router.get('/currentBotInfo', currentBotInfo);
//  router.get('/getBotFriendList', getBotFriendList);
//  router.use(user.routes(), user.allowedMethods());
//  router.use(project.routes(), project.allowedMethods());

 router.get('/', async ctx => {
   ctx.body = 'api/bot';
 });

 export default router;
