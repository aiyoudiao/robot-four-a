/*
 * @Descripttion: 群记录管理
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-25 17:47:00
 * @LastEditTime: 2020-03-30 02:18:58
 * @LastEditors: aiyoudiao
 * @FilePath: \my-robot\src\app\orm-core\controller\group-record-controller.ts
 */

import { GroupRecordService } from '@orm/service/group-record-service';
import BotMessage from '@orm/entity/bot-message';

export async function table(ctx) {
  const botMessage: BotMessage[] = await GroupRecordService.getTable();

  // #region 过滤一下 Code Module


  const newbotMessage = [];
  botMessage.forEach(value => {
    const data = {} as any;
    data.date = value.fromId;
    data.from = value.fromName;
    data.id = value.id;
    data.room = value.room;
    data.message = value.text;
    data.to = value.to;
    data.type = value.type;
    newbotMessage.push(data);
  });

  // #endregion 过滤一下 Code Module End

  // -----------------------------------------分隔符--------------------------------------------


  ctx.body = {
    code: 0,
    data: {
      total: newbotMessage.length,
      dataQuery: newbotMessage
    }
  };
}

export async function searchByFormData(ctx) {
  ctx.body = {};
}
