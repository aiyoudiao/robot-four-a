// const env = process.env.NODE_ENV;
/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-12 11:24:27
 * @LastEditTime: 2020-04-05 22:22:07
 * @LastEditors: aiyoudiao
 * @FilePath: \project\listen-server\ormconfig.js
 */

module.exports = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'robot-db',
  charset: 'utf8mb4',
  synchronize: true,
  logging: false,
  entities: ['src/app/orm-core/entity/*{.ts,.js}'],
};
