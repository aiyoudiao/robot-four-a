/*
 * @Descripttion: 一个扫码信息队列
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-14 09:18:32
 * @LastEditTime: 2020-03-18 18:22:25
 * @LastEditors: aiyoudiao
 * @FilePath: \my-robot\src\common\scan-queue.ts
 */
const scanQueue = [];

export default {

  enqueue(info) {
    scanQueue.push(info);
    console.log('scanQueue入队', scanQueue.length);
  },
  dequeue() {
    console.log('scanQueue出队', scanQueue.length);

    return scanQueue[scanQueue.length - 1];
  },
  isEmpty() {
    console.log('scanQueue是否为空', scanQueue.length);
    return scanQueue.length === 0;
  },
};
