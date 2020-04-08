/*
 * @Descripttion: 扫码登录
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-10 07:05:37
 * @LastEditTime: 2020-03-10 19:19:41
 * @LastEditors: aiyoudiao
 * @FilePath: \web-end\my-robot\src\app\core\controller\bot\scan-login-controller.ts
 */
import Qrterminal from 'qrcode-terminal';
import { ScanStatus } from 'wechaty';
export async function scan(qrcode: string, status: ScanStatus) {
  const data = await new Promise((resolve, reject) => {
    try {
      Qrterminal.generate(qrcode, { small: true }, output => {
        resolve(output);
      });
    } catch (reason) {
      reject(reason);
    }
  });

  console.log(data);
}
