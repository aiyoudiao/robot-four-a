import Router from 'koa-router';
import { userController } from '@controller/v1';

const router = new Router();
router.prefix('/');

/**
 * @api {POST} /v1/users 添加用户
 * @apiDescription 添加用户
 * @apiVersion 1.0.0
 * @apiName postUser
 * @apiGroup users
 *
 * @apiParam (body) {string} user_name 用户名
 * @apiParam (body) {number} age 年龄
 * @apiParam (body) {string} hobby 爱好
 */
router.post('/users', userController.postUser);

/**
 * @api {GET} /v1/users 获取用户列表
 * @apiDescription 获取用户列表
 * @apiVersion 1.0.0
 * @apiName getUserList
 * @apiGroup users
 *
 * @apiParam (query) {string} [user_name] 用户名
 * @apiParam (query) {number} [age] 年龄
 * @apiParam (query) {string} [hobby] 爱好
 */
router.get('/users', userController.getUserList);


/**
 * @api {GET} /v1/users/:user_name 获取某个用户
 * @apiDescription 获取某个用户
 * @apiVersion 1.0.0
 * @apiName getUserList
 * @apiGroup users
 *
 * @apiParam (path) {string} user_name 用户名
 */
router.get('/users/:user_name', userController.getByName);

/**
 * @api {PUT} /v1/users/:user_id 修改用户信息
 * @apiDescription 修改用户信息
 * @apiVersion 1.0.0
 * @apiName putUser
 * @apiGroup users
 *
 * @apiParam (body) {string} [user_name] 用户名
 * @apiParam (body) {number} [age] 年龄
 * @apiParam (body) {string} [hobby] 爱好
 * @apiParam (path) {number} user_id 用户编号
 */
router.put('/users/:user_id', userController.putUser);

/**
 * @api {DELETE} /v1/users/:user_id 删除某个用户
 * @apiDescription 删除某个用户
 * @apiVersion 1.0.0
 * @apiName deleteById
 * @apiGroup users
 *
 * @apiParam (path) {number} user_id 用户编号
 */
router.delete('/users/:user_id', userController.deleteById);

export default router;
