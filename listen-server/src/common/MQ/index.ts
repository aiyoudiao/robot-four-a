/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-04-04 14:47:46
 * @LastEditTime: 2020-04-05 15:00:30
 * @LastEditors: aiyoudiao
 * @FilePath: \project\listen-server\src\common\MQ\index.ts
 */

import RabbitMQSender from './MQPublisher';
import RabbitMQreceiver from './MQConsumer';


function getMQSender<T>(config = {
  exchange: 'LogGroupMessageContentExchange',
  exchangeType: 'direct',
  routeKey: 'LogGroupMessageContentQueue',
  queueName: 'LogGroupMessageContentQueue',
}) {

  console.log(config);

  const mqsender = new RabbitMQSender<T>({
    url: undefined,
    exchange: config.exchange,
    exchangeType: config.exchangeType,
    durable: undefined,
    routeKey: config.routeKey,
    autoDelete: undefined,
    queueName: config.queueName,
  });

  return mqsender.send.bind(mqsender);

}
function getMQReceiver<T>(config = {
  exchange: 'LogGroupMessageContentExchange',
  exchangeType: 'direct',
  routeKey: 'LogGroupMessageContentQueue',
  queueName: 'LogGroupMessageContentQueue',
}) {


  const mqreceiver = new RabbitMQreceiver<T>({
    url: undefined,
    exchange: config.exchange,
    exchangeType: config.exchangeType,
    durable: undefined,
    routeKey: config.routeKey,
    autoDelete: undefined,
    queueName: config.queueName,
  });

  return mqreceiver.receive.bind(mqreceiver);

}

export const mqsender = { get: getMQSender };
export const mqreceiver = {get: getMQReceiver};
