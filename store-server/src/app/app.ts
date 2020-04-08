/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-01-08 09:36:34
 * @LastEditTime: 2020-03-10 05:28:44
 * @LastEditors: aiyoudiao
 * @FilePath: \web-end\my-robot\src\app\app.ts
 */
import Koa from 'koa';
import { PresetMiddleware } from './preset.middleware';


export class AppServer extends Koa {
  presetMiddleware: PresetMiddleware;
  constructor() {
    super();
    this.presetMiddleware = new PresetMiddleware(this);
    this.presetMiddleware.use();
  }
}
