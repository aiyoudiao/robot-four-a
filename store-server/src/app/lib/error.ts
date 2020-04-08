/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-11 01:37:02
 * @LastEditTime: 2020-03-31 23:22:12
 * @LastEditors: aiyoudiao
 * @FilePath: \my-robot\src\app\lib\error.ts
 */
/**
 * 每个模块的错误码梯度递增 50
 */
const errMap = new Map([
  [1000, '未知错误'],
]);

export function getErrorMsg(errcode: number) {
  return errMap.get(errcode) ? errMap.get(errcode) : errMap.get(1000);
}
