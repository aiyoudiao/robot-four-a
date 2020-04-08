/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-04-05 22:04:13
 * @LastEditTime: 2020-04-05 23:14:10
 * @LastEditors: aiyoudiao
 * @FilePath: \project\server\controller\bot\friend.js
 */

const {exec} = require ('../../db/mysql');
const axios = require ('axios');
const {decrypt, genPassword} = require ('../../utils/util');
const jwt = require ('jsonwebtoken');
const {TOKEN_SECRETKEY} = require ('../../config/secret');
const {SuccessModel, ErrorModel} = require ('../../model/resModel');
// const { updateUserMessage } = require('./message')不能引用message否则message和user形成循环引用

//用户表的列名（除去了密码）
const usersColumns = [
  'id',
  'botid',
  'botweixin',
  'uid',
  'weixin',
  'name',
  'alias',
  'avatar',
  'friend',
  'type',
  'tags',
  'star',
  'signature',
  'gender',
  'province',
  'city',
  'date',
];

/**
 * 获取用户列表
 * @param {*} param 
 */
const getBotFriendList = async param => {
  const {current = 0, pageSize = 10, weixin, name, alias} = param;
  // let sql = `select SQL_CALC_FOUND_ROWS ${usersColumns.join (',')} from users where registrationTime between ${startTime || 0} and ${endTime || Date.now ()} `;
  // let sql = `select SQL_CALC_FOUND_ROWS ${usersColumns.join (',')} from bot_friend where weixin like '%${name}%' and alias like '%${alias}%' `;
  // if (weixin) {
  //   sql += `and weixin like '%${weixin}%'`;
  // }
  let sql = `select SQL_CALC_FOUND_ROWS ${usersColumns.join (',')} from bot_friend `;

  sql += `order by id desc limit ${current * pageSize},${pageSize}`;
  const res = await exec (sql);
  const sql2 = 'select found_rows() as total';
  const res2 = await exec (sql2);
  return new SuccessModel ({
    data: {
      list: res,
      current: parseInt (current),
      pageSize: parseInt (pageSize),
      total: res2[0].total,
    },
  });
};
/**
 * 获取单个用户,可根据id或用户名查询单个用户
 * @param {*} param 
 */
const getUser = async param => {
  const {id, username} = param;
  if (!id && !username) {
    return new ErrorModel ({
      message: '参数异常',
      httpCode: 400,
    });
  }
  let sql = `select ${usersColumns.join (',')} from users where `;
  if (id) {
    sql += `id=${id}`;
  } else if (username) {
    sql += `username='${username}'`;
  }
  const res = await exec (sql);
  return new SuccessModel ({
    data: res[0],
  });
};

/**
 * 当更新用户名或用户头像时，更新其它表中和用户相关连的信息
 * @param {*} user 
 */
const updateUserMessage = user => {
  const sql = `update messages set userIsAdmin=${user.isAdmin},userName='${user.username}',userAvatar='${user.avatar}' where userId=${user.id}`;
  const sql2 = `update messages set targetUserIsAdmin=${user.isAdmin},targetUserName='${user.username}',targetUserAvatar='${user.avatar}' where targetUserId=${user.id}`;
  const sql3 = `update chats set username='${user.username}',userAvatar='${user.avatar}' where userId=${user.id}`;
  // 同步执行3个异步任务
  Promise.all ([
    exec (sql),
    exec (sql2),
    exec (sql3),
  ]).then (([res, res2, res3]) => {
    console.log (444, res);
    console.log (555, res2);
    console.log (666, res3);
  });
};

/**
 * 更新用户信息
 * @param {*} param 
 */
const updateUser = async (param, sessionId) => {
  const loginName = jwt.verify (sessionId, TOKEN_SECRETKEY).username;
  if (param.username && loginName !== param.username) {
    //如果修改了用户名还要检查用户名是否已经存在
    const checkNameResult = await checkName (param.username);
    if (checkNameResult.data.num) {
      return new ErrorModel ({
        message: '用户名已存在',
        httpCode: 400,
      });
    }
  }
  let str = '';
  for (let [key, value] of Object.entries (param)) {
    if (value) {
      if (key === 'password') {
        //先解密前端加密的密码
        const originalText = decrypt (value);
        //然后再用另一种方式加密密码
        const ciphertext = genPassword (originalText);
        str += `,${key}='${ciphertext}'`;
      } else {
        str += `,${key}='${value}'`;
      }
    }
  }
  const sql = `update users set ${str.substring (1)} where username='${loginName}'`;
  const res = await exec (sql);
  const res2 = await getUser ({username: param.username});
  if (res2.status === 0) {
    //更新用户的留言（头像、用户名）
    updateUserMessage (res2.data);
  }
  return new SuccessModel ({
    data: {
      ...res2.data,
      token: jwt.sign ({username: param.username}, TOKEN_SECRETKEY, {
        expiresIn: '7d',
      }),
    },
    message: '修改成功',
  });
};

const deleteUsers = async param => {
  const ids = param.ids;
  if (!Array.isArray (ids)) {
    return new ErrorModel ({
      message: '参数异常',
      httpCode: 400,
    });
  }
  const sql = `delete from users where id in (${ids.join (',')})`;
  const res = await exec (sql);
  return new SuccessModel ({
    message: `成功删除${res.affectedRows}条数据`,
  });
};

/**
 * 获取所有用户
 */
const getAllBotFriends = async () => {
  const sql = `select * from bot_friend order by id desc`;
  const res = await exec (sql);
  return new SuccessModel ({
    data: res,
  });
};

module.exports = {
  //   getUsers,
  //   getUser,
  //   updateUser,
  //   deleteUsers,
  //   getAllUsers,
  getAllBotFriends,
  getBotFriendList,
};
