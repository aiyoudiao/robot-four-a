import * as mysql from 'mysql';
import dbConnectionString from './db.conf';
import { apiServerInstance } from '../../../services/apiServiceInstance';
import { normal } from '../../../lib/logger';

const logger = normal();
let pool = null;
function handleError(err) {
  logger.error(err.stack || err);
  connect();
}

function connect() {
  pool = mysql.createPool(Object.assign(dbConnectionString, { connectionLimit: 10 }));
  pool.on('error', handleError);
  pool.on('acquire', function () {
    // console.log('Connection %d acquired', connection.threadId);
  });

  pool.on('enqueue', function () {
    logger.info('Waiting for available connection slot');
  });
}

connect();

// execute the sql.
function exeScript(sqlType, sql, params) {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, function (error, results) {
      if (error) {
        logger.error(`${sqlType}：${error}`);
        reject(error);
      }
      resolve(results);
    });
  });
}

async function callExeScript(sqlType, sql, params) {
  let result;
  try {
    result = await exeScript(sqlType, sql, params);
  } catch (err) {
    logger.error(err);
    apiServerInstance.throwApiErrorResponse(100100);
  }
  return result;
}

async function query(sql, params) {
  const result = await callExeScript('query', sql, params);
  if (result.length >= 1) {
    return result;
  }
  // 这里等于空时，不直接返回error的数据结构，因为等于空时不一定代表错误，因此把为空的错误逻辑交给调用者进行处理
  return '';
}

async function insert(sql, params) {
  const result = await callExeScript('insert', sql, params);
  return result;
}

async function update(sql, params) {
  const result = await callExeScript('update', sql, params);
  return result;
}

// 这里delete估计是关键，所以采用delete1
async function delete1(sql, params) {
  const result = await callExeScript('delete', sql, params);
  return result;
}


export default {
  query,
  insert,
  update,
  delete: delete1
};
