/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-10 05:55:50
 * @LastEditTime: 2020-03-12 12:15:38
 * @LastEditors: aiyoudiao
 * @FilePath: \my-robot\src\app\routes\api\index.ts
 */
import Router from 'koa-router';

import bot from './bot';

const router = new Router();
router.prefix('/api/');

// router.use(v1.routes(), v1.allowedMethods());
router.use(bot.routes(), bot.allowedMethods());


router.get('/', async ctx => {
  ctx.body = 'api';
});

export default router;
