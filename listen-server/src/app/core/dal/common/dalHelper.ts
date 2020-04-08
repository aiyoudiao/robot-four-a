import { apiServerInstance } from '../../../services/apiServiceInstance';

/**
 * [
 *   {
 *     sql: 'sql1',
 *     params: ['params1']
 *   }
 *   {
 *     sql: 'sql2',
 *     params: ['params2','params3']
 *   }
 * ]
 */
export function joinAnd(sqlWhereArr) {
  if (!Array.isArray(sqlWhereArr)) {
    return {
      sql: '',
      params: []
    };
  }
  sqlWhereArr = sqlWhereArr.filter(item => item && item !== '' && item.sql && item.sql !== '');
  if (sqlWhereArr.length <= 0) {
    return {
      sql: '',
      params: []
    };
  }
  const firstSqlWhere = sqlWhereArr.shift();
  let sqlWhere = firstSqlWhere.sql;
  const params = firstSqlWhere.params && Array.isArray(firstSqlWhere.params) ? firstSqlWhere.params : [];
  sqlWhereArr.forEach(item => {
    if (item.sql && item.sql !== '') {
      sqlWhere += ` and ${item.sql} `;
      item.params && Array.isArray(item.params) ? params.push(...item.params) : [];
    }
  });
  return {
    sql: sqlWhere,
    params
  };
}

export function andByModel(obj, tbName?: string) {
  tbName = tbName ? `${tbName}.` : '';
  if (Object.prototype.toString.call(obj) !== '[object Object]') {
    return {
      sql: '',
      params: []
    };
  }
  let sqlWhere = '';
  const params = [];
  Object.keys(obj).forEach(item => {
    if (obj[item] || obj[item] === '' || obj[item] === 0) {
      if (sqlWhere) {
        sqlWhere += ` and ${tbName}${item}=? `;
      } else {
        sqlWhere = ` ${tbName}${item}=? `;
      }
      params.push(obj[item]);
    }
  });
  return {
    sql: sqlWhere,
    params
  };
}

export function insertByModel(obj) {
  if (Object.prototype.toString.call(obj) !== '[object Object]' && Object.prototype.toString.call(obj) !== '[object Array]') {
    return {
      sql: '',
      params: []
    };
  }
  const insertKey = [];
  const placeholders = [];
  const params = [];
  // obj为对象时 生成插入一条数据的sql
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    Object.keys(obj).forEach(item => {
      if (obj[item] === '') {
        insertKey.push(item);
        placeholders.push('?');
        params.push(null);
      } else if (obj[item] || obj[item] === 0) {
        insertKey.push(item);
        placeholders.push('?');
        params.push(obj[item]);
      }
    });
    return {
      sql: ` (${insertKey.join(',')}) values (${placeholders.join(',')})  `,
      params
    };
  }
  // 当obj为数组对象时 生成插入多条数据的sql
  if (Object.prototype.toString.call(obj) === '[object Array]') {
    let temp = '(';
    for (let i = 0; i < obj.length; i++) {
      const objItem = obj[i];
      if (i === 0) {
        Object.keys(objItem).forEach((item, index) => {
          insertKey.push(item);
          if (index === Object.keys(objItem).length - 1) {
            temp += '?)';
          } else {
            temp += '?,';
          }
        });
      }
      Object.keys(objItem).forEach(item => {
        if (
          objItem[item] === ''
          || objItem[item] === undefined
          || objItem[item] === null
        ) {
          params.push(null);
        } else {
          params.push(objItem[item]);
        }
      });
      placeholders.push(temp);
    }
    return {
      sql: ` (${insertKey.join(',')}) values ${placeholders.join(',')}  `,
      params
    };
  }
}

export function updateByModel(obj) {
  if (Object.prototype.toString.call(obj) !== '[object Object]') {
    return {
      sql: '',
      params: []
    };
  }
  const updateSql = [];
  const params = [];
  Object.keys(obj).forEach(item => {
    if (obj[item] === '') {
      updateSql.push(` ${item}=?`);
      params.push(null);
    } else if (obj[item] || obj[item] === 0) {
      updateSql.push(` ${item}=?`);
      params.push(obj[item]);
    }
  });
  if (updateSql.length === 0) {
    apiServerInstance.throwApiErrorResponse(100151);
  }
  return {
    sql: updateSql.join(','),
    params
  };
}

export function orderByFields(sort) {
  if (Object.prototype.toString.call(sort) !== '[object Array]') {
    return {
      sql: '',
      params: []
    };
  }
  const orderBySql = [];
  const params = [];
  sort.forEach(item => {
    if (item.field) {
      const order = item.order ? item.order : 'ASC';
      orderBySql.push(` ${item.field} ${order}`);
    }
  });
  const sql = orderBySql.length > 0 ? `order by ${orderBySql.join(',')}` : '';
  return {
    sql,
    params
  };
}
