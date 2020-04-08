import { ApiNormalResponse, ApiBatchResponse, ApiErrorResponse } from '.';

export class ApiServer {
  normalResponse: ApiNormalResponse; // 正常响应格式
  batchResponse: ApiBatchResponse; // 批量处理的响应格式
  errorResponse: ApiErrorResponse; // 错误响应格式

  constructor(normalResponse: ApiNormalResponse, batchResponse: ApiBatchResponse, errorResponse: ApiErrorResponse) {
    this.normalResponse = normalResponse;
    this.batchResponse = batchResponse;
    this.errorResponse = errorResponse;
  }

  /**
   * 抛出自定义接口错误响应信息，此类型Error会被koa-api-error-response中间件捕获，并返回给客户端
   */
  throwApiErrorResponse(error_no: number, error_message?: string) {
    const apiErrorMsg = this.errorResponse.format({ error_no, error_message });
    throw new Error(JSON.stringify(apiErrorMsg));
  }

  /**
   * 判断是否为自定义接口错误响应
   */
  isApiErrorResponse(errorMsg: string) {
    return /{"code":[^0]\d+?,"message":".*","data":null}/.test(errorMsg);
  }
}
