// 正常响应格式
export interface ResponseMsg<T> {
  code: number;
  message: string;
  data: T;
}

// 分页类型的接口的响应格式
export interface PagingResponseMsg<T> {
  code: number;
  message: string;
  data: T;
  totalCount?: number; // 数据总条数
  pageNo?: number; // 当前页码
  pageSize?: number; // 页大小
  pageCount?: number; // 总页数
}

export interface BatchResponseBody<T> {
  succeed: Array<T>;
  failed: Array<T>;
}

// 批量处理类型的接口的响应格式
export interface BatchResponseMsg<T> {
  code: number;
  message: string;
  data: BatchResponseBody<T>;
  totalCount: number; // 总条数
  repeatCount: number; // 重复条数
  succeedCount: number; // 成功数
  failedCount: number; // 失败数
}
