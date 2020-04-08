/*
 * @Descripttion: 消息队列的生产者
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-28 12:52:39
 * @LastEditTime: 2020-04-05 12:47:36
 * @LastEditors: aiyoudiao
 * @FilePath: \project\listen-server\src\common\MQ\MQPublisher.ts
 */
import amqp, { Channel, ConfirmChannel } from 'amqplib';
import config, { System_Config } from './rabbitmq.config';

interface MessageFormatter {
  [x: string]: any;
}

const RMQOption = config;

async function timeout(time: number = 1000) {
  return new Promise((resolve, rejects) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

export default class RabbitMQ<T> {
  // [x: string]: any;

  exchange: string = System_Config.exchange;
  exchangeType: string = System_Config.exchangeType;
  durable: boolean = System_Config.durable;
  routeKey: string = System_Config.routeKey;
  autoDelete: boolean = System_Config.autoDelete;
  q: string = System_Config.queueName;
  url: string = System_Config.url;

  constructor(options = System_Config) {
    this.exchange = options.exchange || this.exchange 
    this.exchangeType = options.exchangeType || this.exchangeType 
    this.durable = options.durable || this.durable 
    this.routeKey = options.routeKey || this.routeKey
    this.autoDelete = options.autoDelete || this.autoDelete
    this.q = options.queueName || this.q 
    this.url = options.url || this.url
  }

  async send(entity: T) {
    const conn = await amqp.connect(RMQOption);
    const ety = JSON.stringify(entity);
    let ch: ConfirmChannel;
    try {
      // 确认消息发送 ok 猜测是开启 confirm 机制，对应的监听函数是什么呢?
      ch = await conn.createConfirmChannel();
      const res = await ch.assertExchange(this.exchange, this.exchangeType, {
        durable: this.durable,
      });

      ch.publish(this.exchange, this.routeKey, Buffer.from(ety, 'utf-8'), {
          persistent: true, // 消息持久化
          mandatory: true, // 强制
          contentType: 'application/json' // 设置内容类型
      });
      // 确认消息已经入队, 返回错误 是啥样? 错误怎么处理?直接close?
      const res2 = await ch.waitForConfirms();
      console.log('==res2==', res2);
      console.log(" [x] Sent '%s'", ety);

      //     let flag = 0;
      //     while (flag < 100) {
      //       // 实现消息持久化, 要exchange,queue,msg 三者同时持久化
      //       /*
      // 如果exchange根据自身类型和消息routeKey无法找到一个符合条件的queue，
      // 那么会调用basic.return方法将消息返回给生产者（Basic.Return + Content-Header + Content-Body）；
      // 当mandatory设置为false时，出现上述情形broker会直接将消息扔掉
      // */
      //       ch.publish(this.exchange, this.routeKey, Buffer.from(msg, 'utf-8'), {
      //         persistent: true, // 消息持久化
      //         mandatory: true, // 强制
      //         contentType: 'application/json' // 设置内容类型
      //       });
      //       // 确认消息已经入队, 返回错误 是啥样? 错误怎么处理?直接close?
      //       const res2 = await ch.waitForConfirms();
      //       console.log('==res2==', res2);

      //       console.log(" [x] Sent '%s'", msg);

      //       await timeout(1000);
      //       flag++;
      //     }
      ch.close();
    } catch (e) {
      console.log('==e==', e);
      ch.close();
    }
  }
}

// const rabbit = new RabbitMQ({});

// rabbit.send();
