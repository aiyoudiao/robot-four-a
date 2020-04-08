/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-11 01:33:33
 * @LastEditTime: 2020-03-18 17:58:54
 * @LastEditors: aiyoudiao
 * @FilePath: \my-robot\src\app\config\variate.ts
 */
/**
 * 整个项目的入口变量
 */

// 开发环境: development || testing || production, 默认 development
export const NODE_ENV: string = process.env.NODE_ENV;

// 数据库密码

// export const DB_PASSWORD: string = process.env.DB_PASSWORD;
export const DB_PASSWORD: string = '123456';
// 启动端口号,默认 8080
export const PORT: string = process.env.PORT || '8989';
