import { ApiResponseBase } from './ApiResponseBase';
import { BatchResponseMsg } from '@model/v1';
import { BatchResponseOption } from './typing';

export class ApiBatchResponse implements ApiResponseBase {
  format<T>(option: BatchResponseOption<T>): BatchResponseMsg<T> {
    const responseMsg: BatchResponseMsg<T> = {
      code: 0,
      message: null,
      data: {
        succeed: option.succeedData,
        failed: option.failedData
      },
      succeedCount: option.succeedData && option.succeedData.length,
      failedCount: option.failedData && option.failedData.length,
      repeatCount: option.repeatCount,
      totalCount: option.totalCount
    };
    return responseMsg;
  }
}
