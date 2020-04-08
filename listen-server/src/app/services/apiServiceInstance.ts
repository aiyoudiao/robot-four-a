import {
  ApiServer, ApiNormalResponse, ApiBatchResponse, ApiErrorResponse
} from './api-service';

const apiNormalResponseInstance = new ApiNormalResponse();
const apiBatchResponseInstance = new ApiBatchResponse();
const apiErrorResponseInstance = new ApiErrorResponse();
const apiServerInstance = new ApiServer(apiNormalResponseInstance, apiBatchResponseInstance, apiErrorResponseInstance);

export { apiServerInstance };
