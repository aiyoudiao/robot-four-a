export interface NormalResponseOption<T> {
  data: T;
  pageNo?: number;
  pageSize?: number;
  totalCount?: number;
}

export interface ErrorResponseOption {
  error_no: number;
  error_message?: string;
}

export interface BatchResponseOption<T> {
  succeedData: Array<T>;
  failedData: Array<T>;
  totalCount?: number;
  repeatCount?: number;
}
