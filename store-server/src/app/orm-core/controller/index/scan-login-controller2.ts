/*
 * @Descripttion: 扫码登录
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-10 07:05:37
 * @LastEditTime: 2020-03-31 23:29:54
 * @LastEditors: aiyoudiao
 * @FilePath: \my-robot\src\app\orm-core\controller\index\scan-login-controller.ts
 */
import Qrterminal from 'qrcode-terminal';
import QRcode from 'easyqrcodejs-nodejs';
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

  /* 早期的状态是这样的 */
  // const scanState = {
  //   '-1': '未知异常',
  //   0: '已取消登录',
  //   1: '请扫码确认登录',
  //   2: '扫码成功，待确认',
  //   3: '登录成功',
  //   4: '二维码超时',
  // };

  const scanState = {
    0: '正在初始化',
    1: '已取消登录',
    2: '请扫码确认登录',
    3: '扫码成功，待确认',
    4: '已登录成功',
    5: '二维码超时',
  };

  const config3 = {
    // ====== Basic
    // text: 'www.easyproject.cn/donation',
    text: qrcode,
    width: 400,
    height: 400,
    correctLevel: QRcode.CorrectLevel.H, // L, M, Q, H
    dotScale: 0.7, // Must be greater than 0, less than or equal to 1. default is 1
    colorDark: '#F50057',
    colorLight: '#FCE4EC',

    // QuietZone
    quietZone: 15,

    // === Title
    title: 'iPad微信登录', // Title
    titleFont: 'bold 24px sans-serif', // Title font
    titleColor: '#FF3D00', // Title Color
    titleBackgroundColor: '#FFCDD2', // Title Background
    titleHeight: 70, // Title height, include subTitle
    titleTop: 25, // Title draw position(Y coordinate), default is 30

    // === SubTitle
    subTitle: scanState[`${status}`], // Subtitle content
    subTitleFont: '20px sans-serif', // Subtitle font
    subTitleColor: '#FF6D00', // Subtitle color
    subTitleTop: 50, // Subtitle drwa position(Y coordinate), default is 50

    /* PI  为 内
     ** PO  为 外
     */

    // === Posotion Pattern(Eye) Color
    PI: 'rgb(239,112,96)',
    PO: '#FF3D00',

    PI_TL: 'rgb(239,112,96)', // Position Inner - Top Left
    PO_TL: '#FF3D00', // Position Outer - Top Right
    // AO: '#336699', // Position Outer - Bottom Right
    // AI: '#336699', // Position Inner - Bottom Right

    // === Aligment color
    AI: 'rgb(239,112,96)',
    AO: '#FF3D00',

    // === Timing Pattern Color
    // timing: '#e1622f', // Global Timing color. if not set, the defaut is `colorDark`
    timing_H: '#0f0', // Horizontal timing color
    timing_V: '#0ff', // Vertical timing color

    // === Logo
    // logo: "https://avatars1.githubusercontent.com/u/4082017?s=160&v=4", // LOGO
    // logo: '../../../assets/static/bg.jpg', // LOGO
    logo: 'http://localhost:8989/static/bg.jpg',
    logoWidth: 100,
    logoHeight: 100,
    logoBackgroundColor: '#FFCDD2', // Logo backgroud color, Invalid when `logBgTransparent` is true; default is '#ffffff'
    logoBackgroundTransparent: true, // Whether use transparent image, default is false

    // === Background image
    // backgroundImage: '../../../assets/static/bg.jpg',
    // backgroundImage: "http://localhost:8989/static/bg.jpg",
    // backgroundImageAlpha: 0.3,
    // autoColor: true,

    // onRenderingStart: function(options) {
    //   console.info('The QRCode file `q3.' + options.format + '` was created.');
    // },

    // format:'JPG'+
  };

  const qrcodeControler = new QRcode(config3);
  const data2 = await qrcodeControler.toDataURL();

  scanQueueList.enqueue(data2);
  // console.log(data2);

  // scanQueueList.enqueue(data);
  // console.log(data);
}
