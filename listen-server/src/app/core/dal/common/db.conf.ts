/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-11 01:36:38
 * @LastEditTime: 2020-03-11 02:26:24
 * @LastEditors: aiyoudiao
 * @FilePath: \my-robot\src\app\core\dal\common\db.conf.ts
 */
import GLOBAL_CONFIG from '../../../config/system.config';

export default {
  host: GLOBAL_CONFIG.db.host,
  user: GLOBAL_CONFIG.db.user,
  password: GLOBAL_CONFIG.db.password,
  database: GLOBAL_CONFIG.db.database,
  dateStrings: true
};
