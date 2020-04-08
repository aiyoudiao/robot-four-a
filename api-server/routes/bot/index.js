/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-04-05 21:16:19
 * @LastEditTime: 2020-04-05 21:53:33
 * @LastEditors: aiyoudiao
 * @FilePath: \project\server\routes\bot\index.js
 */
const router = require ('koa-router') ();
const frined = require ('./friend');

router.prefix ('/bot');

router.use (frined.routes (), frined.allowedMethods ());

router.get ('/', async ctx => {
  ctx.body = {
    name: 'bot',
    path: '/',
  };
});

module.exports = router;
