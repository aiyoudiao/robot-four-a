export function sqlPaging(sqlStr, pageNo, pageSize) {
  if (!pageNo || !pageSize) {
    return sqlStr;
  }
  sqlStr += ` limit ${pageSize * (pageNo - 1)},${pageSize}`;
  return sqlStr;
}
