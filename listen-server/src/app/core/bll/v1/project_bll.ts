/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-08 10:23:29
 * @LastEditTime: 2020-03-10 06:00:53
 * @LastEditors: aiyoudiao
 */
import { get, post } from '@common/request';

export async function getProjectList() {
  const data = await get('http://www.dell-lee.com/react/api/demo.json', {});
  // const data = await get(
  //   "http://172.19.67.156:8081/artifactory/api/storage/libs-snapshot-local/com/houtai/manager/demo/1.0-SNAPSHOT/demo-1.0-20200102.075512-30.war?properties",
  //   "Basic YWRtaW46cGFzc3dvcmQ="
  // );
  return data;
}
