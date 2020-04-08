/*
 * @Descripttion: 消息队列的消费者
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-28 12:52:39
 * @LastEditTime: 2020-04-05 12:58:26
 * @LastEditors: aiyoudiao
 * @FilePath: \project\listen-server\src\common\MQ\MQConsumer.ts
 */
import amqp, { Channel } from 'amqplib';
import config, { System_Config } from './rabbitmq.config';

const RMQOption = config;

let count = 16;

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
    this.exchange = options.exchange;
    this.exchangeType = options.exchangeType;
    this.durable = options.durable;
    this.routeKey = options.routeKey;
    this.autoDelete = options.autoDelete;
    this.q = options.queueName;
    this.url = options.url;
  }

  async receive<T>(hooks) {
    const conn = await amqp.connect(RMQOption);
    let ch: Channel;
    try {
      ch = await conn.createChannel();
      // 确认消息发送 ok
      const res = await ch.assertExchange(this.exchange, this.exchangeType, { durable: this.durable });
      // 此处 q 置空，用的是rabbitmq自动生成的队列名, exclusive 是生成排他队列, 连接断开后就会自动删除
      // const q = await ch.assertQueue('', { exclusive: false });
      /* 这里会创建一个队列 */
      const q = await ch.assertQueue(this.q, { exclusive: false });

      console.log('==q=', q);
      // 队列绑定 exchange
      ch.bindQueue(q.queue, this.exchange, this.routeKey);

      ch.consume(q.queue, msg => {
        const message = Buffer.from(msg.content).toString('utf-8');
        console.log('收到消息: ', message);
        const entity: T = JSON.parse(message);
        /* 调用一下钩子 */
        hooks(entity);
         // 发送确认消息
        ch.ack(msg);
      }, { noAck: false });

      // ch.close()
    } catch (e) {
      console.log('==e==', e);
      ch.close();

      /* 重新启动 */
      if (count > 1) {
        count --
        await this.receive<T>(hooks)
      }
    }
  }
}

// const rabbit = new RabbitMQ({});

// rabbit.send();
