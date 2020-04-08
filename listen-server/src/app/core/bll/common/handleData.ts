export function getCount(dbData: any) {
  if (dbData === '') {
    return '';
  }
  return parseInt(dbData[0]['count'], 10);
}

export function getFirstRow(dbData: any) {
  if (dbData === '') {
    return '';
  }
  return dbData[0];
}

export function getFoundRowsNum(dbData: any) {
  if (dbData === '') {
    return '';
  }
  return dbData[0]['num'];
}

// 数据库增删改的操作结果
export function getCUDResult(result: any) {
  return {
    fieldCount: result['fieldCount'],
    affectedRows: result['affectedRows'],
    insertId: result['insertId'],
    serverStatus: result['serverStatus'],
    warningCount: result['warningCount'],
    message: result['message'],
    protocol41: result['protocol41'],
    changedRows: result['changedRows']
  };
}
