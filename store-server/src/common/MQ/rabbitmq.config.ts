/*
 * @Descripttion: RMQ的配置文件
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-27 17:33:15
 * @LastEditTime: 2020-04-04 22:56:03
 * @LastEditors: aiyoudiao
 * @FilePath: \project\listen-server\src\common\MQ\rabbitmq.config.ts
 */
export default {
  // RMQOption_HOST: '148.70.139.45',
  // RMQOption_PORT: 5672,
  // RMQOption_USERNAME: 'admin',
  // RMQOption_PASSWORD: 'admin123',
  // RMQOption_HOST: '148.70.139.45',
  // RMQOption_PORT: 5673,
  // RMQOption_USERNAME: 'admin',
  // RMQOption_PASSWORD: 'admin123',
  /* 本地地址是下面这两个 */
  // RMQOption_HOST: process.env.RMQOption_HOST || '127.0.0.1',
  // RMQOption_PORT: (process.env.RMQOption_PORT && Number(process.env.RMQOption_PORT)) || 5672,
  // RMQOption_USERNAME: process.env.RMQOption_USERNAME || 'admin',
  // RMQOption_PASSWORD: process.env.RMQOption_PASSWORD || 'admin',


  protocol: 'amqp',
  // hostname: '148.70.139.45',
  hostname: '127.0.0.1',
  port: 5672,
  username: 'admin',
  password: 'admin',
  locale: 'en_US',
  frameMax: 0,
  heartbeat: 0,
  vhost: '/',

};

export const System_Config = {
  url: 'amqp://admin:admin@127.0.0.1:5672',
  exchange: 'LogGroupMessageContentExchange',
  exchangeType: 'direct',
  durable: true,
  routeKey: 'LogGroupMessageContentQueue',
  autoDelete: true,
  queueName: 'LogGroupMessageContentQueue',
};
