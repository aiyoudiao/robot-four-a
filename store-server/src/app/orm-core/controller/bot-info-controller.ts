/*
 * @Descripttion: 机器人信息的控制器
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-30 01:35:37
 * @LastEditTime: 2020-03-30 02:12:18
 * @LastEditors: aiyoudiao
 * @FilePath: \my-robot\src\app\orm-core\controller\bot-info-controller.ts
 */
 import { BotInfoService } from '@orm/service/bot-info-service';
 import BotInfo from '@orm/entity/bot-info';
 import { dateFormat } from '@common/utils';

export async function currentBotInfo(ctx) {
  const botInfo: BotInfo = await BotInfoService.selectCurrentInfo();
  botInfo.date = dateFormat.call(botInfo.date, 'yyyy-MM-dd HH:mm:ss');
  ctx.body = {
    code: 0,
    data: {
      botInfo: botInfo || {}
    }
  };
}
