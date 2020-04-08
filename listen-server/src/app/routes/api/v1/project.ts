/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-08 10:35:41
 * @LastEditTime : 2020-01-08 10:39:27
 * @LastEditors  : ilovejwl
 */
import Router from 'koa-router';
import { projectController } from '@controller/v1';

const router = new Router();
router.prefix('/');
router.get('/project', projectController.getProjectListData);
export default router;
