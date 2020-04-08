/*
 * @Descripttion: 扫码登录 - 前端实现二维码
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-10 07:05:37
 * @LastEditTime: 2020-04-01 12:11:44
 * @LastEditors: aiyoudiao
 * @FilePath: \my-robot\src\app\orm-core\controller\index\scan-login-controller.ts
 */
import Qrterminal from 'qrcode-terminal';
import { ScanStatus } from 'wechaty';
import scanQueueList from '@common/scan-queue';

export async function scan(qrcode: string, status: ScanStatus) {
  console.log('@qrcode', qrcode);
  console.log('@status', status);
  const data = await new Promise((resolve, reject) => {
    try {
      Qrterminal.generate(qrcode, { small: true }, output => {
        resolve(output);
      });
    } catch (reason) {
      reject(reason);
    }
  });

  console.log('@@二维码要来了@@');
  console.log(data);

  scanQueueList.enqueue({ qrcode, status });
}
