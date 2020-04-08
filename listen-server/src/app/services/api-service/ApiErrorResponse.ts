/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-11 01:37:35
 * @LastEditTime: 2020-03-11 06:52:44
 * @LastEditors: aiyoudiao
 * @FilePath: \my-robot\src\app\services\api-service\ApiErrorResponse.ts
 */
import { ApiResponseBase } from './ApiResponseBase';
import { ResponseMsg } from '@model/v1';
import { ErrorResponseOption } from './typing';
import { getErrorMsg } from '../../lib/error';

export class ApiErrorResponse implements ApiResponseBase {
  format<T>(option: ErrorResponseOption): ResponseMsg<T> {
    const responseMsg: ResponseMsg<T> = {
      code: option.error_no,
      message: option.error_message
        ? option.error_message
        : getErrorMsg(option.error_no),
      data: null,
    };
    return responseMsg;
  }
}
