/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-08 10:33:12
 * @LastEditTime : 2020-01-08 10:37:20
 * @LastEditors  : ilovejwl
 */
import { projectBll } from '@bll/v1';

export async function getProjectListData(ctx) {
  const projectList = await projectBll.getProjectList();
  ctx.body = projectList;
}
