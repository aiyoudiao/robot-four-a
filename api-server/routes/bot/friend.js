/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-04-05 21:16:35
 * @LastEditTime: 2020-04-05 22:41:39
 * @LastEditors: aiyoudiao
 * @FilePath: \project\server\routes\bot\friend.js
 */
const router = require ('koa-router') ();
const {
  getAllBotFriends,
  getBotFriendList,
} = require ('../../controller/bot/friend');

router.prefix ('/friend');

function handleRes (ctx, next, res) {
  if (res.status === 0) {
    ctx.body = res;
  } else {
    ctx.status = res.httpCode;
    ctx.body = res;
    // ctx.message = res.message   //本来想直接设置fetch的statusText，但是加了这句话请求就出错
  }
}

// router.get ('/getFriends', async function (ctx, next) {
//   const res = await getAllBotFriends ();
//   handleRes (ctx, next, res);
// });

router.get ('/getFriends', async function (ctx, next) {
  const res = await getBotFriendList (ctx.query);
  handleRes (ctx, next, res);
});

module.exports = router;
