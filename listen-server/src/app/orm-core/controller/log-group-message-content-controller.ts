/*
 * @Descripttion: 群记录管理
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-25 17:47:00
 * @LastEditTime: 2020-04-05 14:35:24
 * @LastEditors: aiyoudiao
 * @FilePath: \project\listen-server\src\app\orm-core\controller\log-group-message-content-controller.ts
 */

import { LogGroupMessageContentService } from '@orm/service/log-group-message-content-service';
import { LogGroupMessageContent } from '@orm/entity/LogGroupMessageContent';


// export async function table(ctx) {
//   const logGroupMessageContent: LogGroupMessageContent[] = await LogGroupMessageContentService.selectMessage();

//   ctx.body = {
//     code: 0,
//     data: {
//       total: logGroupMessageContent.length,
//       dataQuery: logGroupMessageContent
//     }
//   };
// }

export async function searchByFormData(ctx) {
  ctx.body = {};
}
