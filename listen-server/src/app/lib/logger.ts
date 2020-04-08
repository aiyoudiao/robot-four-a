import * as log4js from 'log4js';
import { Logger } from 'log4js';

/**
 * ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF
 */
log4js.configure({
  appenders: {
    console: {
      type: 'console'
    }
  },
  categories: {
    default: { appenders: ['console'], level: 'info' }, // 只输出到控制台
  }
});

export function normal(category?: string): Logger {
  if (!category) {
    // get filename
    const error = (new Error()).stack.toString().split('\n')[2] || '';
    category = (error.match(/[\\/(]([-\w.]+.\w+):\d+:\d+\)$/) || [])[1] || 'unknow';
  }
  return log4js.getLogger(category);
}
