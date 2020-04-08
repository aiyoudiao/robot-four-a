/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-29 13:25:30
 * @LastEditTime: 2020-03-30 01:35:13
 * @LastEditors: aiyoudiao
 * @FilePath: \my-robot\src\app\orm-core\service\bot-info-service.ts
 */

import { getManager } from 'typeorm';
import BotInfo from '@orm/entity/bot-info';

export class BotInfoService {
  static async insertInfo(Info: BotInfo) {
    const botInfoRepository = getManager().getRepository(BotInfo);
    const newbotInfo = botInfoRepository.create(Info);

    await botInfoRepository.save(newbotInfo);

    return 'insert Info success!!!';
  }

  static async selectCurrentInfo() {
    const botInfoRepository = getManager().getRepository(BotInfo);

    // const result = await botInfoRepository.find({
    //     order: {
    //         id: 'DESC'
    //   },
    //   skip: 0,
    //   take: 1
    // });
    const result = await botInfoRepository.findOne({
        order: {
            id: 'DESC'
      }
    });

    return result;
  }
}
