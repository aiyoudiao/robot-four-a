import { dbHelper, sqlHelper, dalHelper } from '../common';
import { UserDbModel } from '@model/v1';

export async function insert(dbModel: UserDbModel) {
  const insertModel = dalHelper.insertByModel(dbModel);
  const modelSql = insertModel.sql;
  const modelParams = insertModel.params && Array.isArray(insertModel.params) ? insertModel.params : [];
  const sql = `insert into user ${modelSql}`;
  const sqlParams = [...modelParams];
  return dbHelper.insert(sql, sqlParams);
}

export async function getUserList(dbModel?: UserDbModel,
  search?: string, pageNo?: number, pageSize?: number): Promise<Array<UserDbModel>> {
  const sqlWhere = getCommonWhere(dbModel, search);
  const whereSql = sqlWhere.whereSql;
  const whereParams = sqlWhere.whereParams;

  const sql = `SELECT * FROM user ${whereSql}`;
  const sqlWithPaging = sqlHelper.sqlPaging(sql, pageNo, pageSize);
  const sqlParams = [...whereParams];
  return dbHelper.query(sqlWithPaging, sqlParams);
}

export async function getUserListCount(dbModel?: UserDbModel, search?: string) {
  const sqlWhere = getCommonWhere(dbModel, search);
  const whereSql = sqlWhere.whereSql;
  const whereParams = sqlWhere.whereParams;

  const sql = `SELECT count(*) as count FROM user ${whereSql} `;
  const sqlParams = [...whereParams];
  return dbHelper.query(sql, sqlParams);
}

export async function updateById(userId: number, dbModel?: UserDbModel) {
  const updateModel = dalHelper.updateByModel(dbModel);
  const modelSql = updateModel.sql;
  const modelParams = updateModel.params && Array.isArray(updateModel.params) ? updateModel.params : [];
  const sql = `update user
                  set ${modelSql}
                  where user_id=?`;

  const sqlParams = [...modelParams, userId];
  return dbHelper.update(sql, sqlParams);
}

// 删除某个用户
export async function deleteById(userId: number) {
  const sqlStr = 'DELETE FROM user WHERE user_id = ?';
  const sqlParams = [userId];
  return dbHelper.delete(sqlStr, sqlParams);
}

function createSearchWhereSql(search: string, tbName?: string) {
  tbName = tbName ? `${tbName}.` : '';
  // 关键词查询 where
  let searchWhereSql;
  if (search && search !== '') {
    searchWhereSql = `(${tbName}user_name like '%${search}%'
        or ${tbName}hobby like '%${search}%')`;
  }
  return searchWhereSql;
}

function getCommonWhere(dbModel: UserDbModel, search: string) {
  // 关键词查询 where
  const searchWhereSql = createSearchWhereSql(search);
  const searchWhere = {
    sql: searchWhereSql,
    params: []
  };
  // 根据参数精确查询 where
  const modelWhere = dalHelper.andByModel(dbModel);

  const sqlWhere = dalHelper.joinAnd([searchWhere, modelWhere]);
  const whereSql = sqlWhere.sql ? `where ${sqlWhere.sql}` : ' ';
  const whereParams = sqlWhere.params && Array.isArray(sqlWhere.params) ? sqlWhere.params : [];

  return {
    whereSql,
    whereParams
  };
}
