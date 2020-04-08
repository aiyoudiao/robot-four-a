import 'should';
import appServer from '../../app.start';
import supertest from 'supertest';
import {
  UserDbModel,
  UserPostJsonReqModel,
  UserResModel,
  UserDeleteResModel,
  ResponseMsg,
  UserUpdateResModel
} from '@model/v1';
let app;
let request;

describe('开始测试 user 接口', () => {
  beforeAll(() => {
    app = appServer();
    request = supertest(app);
  });

  afterAll((done) => {
    app.close(done);
  });

  let user: UserDbModel = {
    user_name: '_user_name',
    age: 30,
    hobby: '_hobby'
  };

  it('test api: (post) /users (添加用户,参数不足,添加失败)', async function () {
    const userParam = {
      age: user.age,
      hobby: user.hobby
    };
    const result = await
      request.post('/api/v1/users')
        .expect(200)
        .send(userParam);
    const resultJson: ResponseMsg<UserResModel> = JSON.parse(result.text);
    resultJson.code.should.equal(100150);
  });

  it('test api: (post) /users (添加用户,添加成功)', async function () {
    const userParam: UserPostJsonReqModel = {
      user_name: user.user_name,
      age: user.age,
      hobby: user.hobby
    };
    const result = await
      request.post('/api/v1/users')
        .expect(200)
        .send(userParam);
    const resultJson: ResponseMsg<UserResModel> = JSON.parse(result.text);
    resultJson.code.should.equal(0);
    user.user_id = resultJson.data.userId;
    resultJson.data.userName.should.eql(user.user_name);
  });

  it('test api: (post) /users (重复添加用户,添加失败)', async function () {
    const userParam: UserPostJsonReqModel = {
      user_name: user.user_name,
      age: user.age,
      hobby: user.hobby
    };
    const result = await
      request.post('/api/v1/users')
        .expect(200)
        .send(userParam);
    const resultJson: ResponseMsg<UserResModel> = JSON.parse(result.text);
    resultJson.code.should.equal(100002);
  });

  it('test api: (get) /users (获取用户列表)', async function () {
    const result = await
      request.get('/api/v1/users')
        .expect(200);
    const resultJson: ResponseMsg<Array<UserResModel>> = JSON.parse(result.text);
    resultJson.code.should.equal(0);
    resultJson.data.length.should.aboveOrEqual(4);
  });

  it('test api: (get) /users (获取年龄为18的用户列表)', async function () {
    const result = await
      request.get('/api/v1/users?age=18')
        .expect(200);
    const resultJson: ResponseMsg<Array<UserResModel>> = JSON.parse(result.text);
    resultJson.code.should.equal(0);
    resultJson.data.length.should.aboveOrEqual(2);
  });

  it('test api: (get) /users/user_name (获取某个用户)', async function () {
    const result = await
      request.get(`/api/v1/users/${user.user_name}`)
        .expect(200);
    const resultJson: ResponseMsg<UserResModel> = JSON.parse(result.text);
    resultJson.code.should.equal(0);
    resultJson.data.userId.should.eql(user.user_id);
    resultJson.data.userName.should.eql(user.user_name);
    resultJson.data.age.should.eql(user.age);
    resultJson.data.hobby.should.eql(user.hobby);
  });

  it('test api: (put) /users (修改用户信息,修改成功)', async function () {
    const userParam: UserPostJsonReqModel = {
      user_name: `${user.user_name}2`,
      age: user.age + 10,
      hobby: `${user.hobby}2`
    };
    const result = await
      request.put(`/api/v1/users/${user.user_id}`)
        .expect(200)
        .send(userParam);
    const resultJson: ResponseMsg<UserUpdateResModel> = JSON.parse(result.text);
    resultJson.code.should.equal(0);
    resultJson.data.isUpdateSuccess.should.equal(true);
    user = { ...user, ...userParam };
  });

  it('test api: (delete) /users/:user_id (删除某个用户)', async function () {
    const result = await
      request.delete(`/api/v1/users/${user.user_id}`)
        .expect(200);
    const resultJson: ResponseMsg<UserDeleteResModel> = JSON.parse(result.text);
    resultJson.code.should.equal(0);
    resultJson.data.isDeleteSuccess.should.equal(true);
  });
});
