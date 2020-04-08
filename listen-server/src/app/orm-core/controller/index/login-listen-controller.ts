/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-29 13:22:19
 * @LastEditTime: 2020-04-05 14:50:11
 * @LastEditors: aiyoudiao
 * @FilePath: \project\listen-server\src\app\orm-core\controller\index\login-listen-controller.ts
 */
import { ContactSelf, Contact } from 'wechaty/dist/src/user';
import { BotInfoService } from '@orm/service/bot-info-service';
import { BotFriendService } from '@orm/service/bot-friend-service';
import BotInfo from '@orm/entity/bot-info';
import { BotFriend } from '@orm/entity/bot-friend';
import { ContactType } from 'wechaty-puppet-padplus/dist/src/schemas';

type myContact = {
  // id: 'wxid',
  // domain: null,
  // payload: {
  alias: '';
  avatar: 'http://wx.qlogo.cn/';
  city: '';
  friend: true;
  gender: 0;
  id: 'wxid';
  name: '微信昵称';
  province: '';
  signature: '';
  type: 1;
  weixin: '微信号';
  // },
};

type mybotKeyWord = {
  botid: string,
  botweixin: string,
  loginDate: Date
}

export async function login(user: ContactSelf) {
  const contactList = await user.wechaty.Contact.findAll();
  // console.log(`contactList ===>${contactList}`, contactList);

  /* 添加机器人信息 */
  const bot = await insertBotInfo(user);
  console.log(`-----------------bot 1----------------`)
  /* 添加机器人好友的列表 */
  await insertAllBotFriend(contactList, bot);
  console.log(`-----------------bot 2----------------`)
  process.env.loginDate = (+bot.loginDate).toString();
}

/**
 * @description 添加所有好友信息
 * @author aiyoudiao
 * @date 2020-03-30
 * @param {Contact[]} contactList
 * @param {mybotKeyWord} bot
 */
async function insertAllBotFriend(contactList: Contact[], bot: mybotKeyWord) {
  let isAllFirendLoaded = true;
  contactList.forEach(async contact => {
    const result: boolean = await insertBotFriend(contact, bot);
    if (!result) {
      isAllFirendLoaded = false;
    }
  });

  if (isAllFirendLoaded) {
    console.log('※※※※※※※※※※※所有好友信息加载完毕※※※※※※※※※※');
  }
}


/**
 * @description 添加机器人好友
 * @author aiyoudiao
 * @date 2020-03-30
 * @param {Contact} contact
 * @param {mybotKeyWord} bot
 * @returns boolean
 */
async function insertBotFriend(contact: Contact, bot: mybotKeyWord) {
  const payload = Reflect.get(contact, 'payload') as myContact;

  const {
    alias,
    avatar,
    city,
    friend,
    gender,
    id: uid,
    name,
    province,
    signature,
    type,
    weixin,
  } = payload;

  const star = contact.star() || false;
  const tags = ''; // await (await contact.tags()).join(',');

  const { botid, botweixin, loginDate } = bot;

  const result = await BotFriendService.insertBotFriendToQueue(({
    uid,
    alias,
    friend,
    type,
    name,
    avatar,
    weixin,
    signature,
    gender,
    city,
    province,
    star,
    tags,
    botid,
    botweixin,
    date: loginDate,
  } as unknown) as BotFriend);

  return result;
}


/**
 * @description 插入机器人信息到数据库中
 * @author aiyoudiao
 * @date 2020-03-30
 * @param {ContactSelf} user
 * @returns mybotKeyWord
 */
async function insertBotInfo(user: ContactSelf) {
  const loginDate = new Date();

  // console.log(`user========>${user}`, user);
  // const uid = user.id;
  // const weixin = user.weixin();
  // const name = user.name();
  // const avatar = await (await user.avatar()).toBase64();
  let qrcode;
  try {
    qrcode = await user.qrcode();
  } catch (error) {
    qrcode = error.toString();
  }

  // console.log('qrcode', qrcode);
  // // const signature = user
  // const gender = user.gender().toString();
  // const province = user.province();
  // const city = user.city();

  const payload = Reflect.get(user, 'payload') as myContact;
  // console.log(Reflect.getOwnMetadata('payload', user));

  const {
    alias,
    avatar,
    city,
    friend,
    gender,
    id: uid,
    name,
    province,
    signature,
    type,
    weixin,
  } = payload;

  const info = await BotInfoService.insertInfo(({
    uid,
    name,
    avatar,
    weixin,
    signature,
    gender,
    city,
    province,
    qrcode,
    date: loginDate,
  } as unknown) as BotInfo);
  console.log('插入数据', info);

  return {
    botid: uid,
    botweixin: weixin,
    loginDate,
  } as mybotKeyWord;
}
