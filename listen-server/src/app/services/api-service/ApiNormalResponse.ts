import { ApiResponseBase } from './ApiResponseBase';
import { ResponseMsg, PagingResponseMsg } from '@model/v1';
import { NormalResponseOption } from './typing';

export class ApiNormalResponse implements ApiResponseBase {
  format<T>(option: NormalResponseOption<T>): ResponseMsg<T> | PagingResponseMsg<T> {
    const responseMsg: ResponseMsg<T> | PagingResponseMsg<T> = {
      code: 0,
      message: null,
      data: option.data
    };
    if (option.totalCount >= 0) {
      (responseMsg as PagingResponseMsg<T>).totalCount = option.totalCount;
    }
    if (option.pageNo && option.pageSize && option.totalCount >= 0) {
      (responseMsg as PagingResponseMsg<T>).pageSize = option.pageSize;
      (responseMsg as PagingResponseMsg<T>).pageNo = option.pageNo;
      (responseMsg as PagingResponseMsg<T>).pageCount = Math.ceil(option.totalCount / option.pageSize);
    }
    return responseMsg;
  }
}
