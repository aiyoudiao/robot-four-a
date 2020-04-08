/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-08 10:15:57
 * @LastEditTime : 2020-01-08 10:58:57
 * @LastEditors  : ilovejwl
 */

const request = require('request');

export async function post(url, data) {
  let i = 3;
  while (i--) {
    try {
      const result = await doPostRequest(url, data);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

function doPostRequest(url, data) {
  return new Promise((resolve, reject) => {
    const options = {
      url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    };

    request(options, function (error, response, body) {
      if (error) {
        return reject(error);
      }
      if (response.statusCode === 200) {
        resolve(response.body);
      } else {
        reject(new Error(JSON.stringify(response)));
      }
    });
  });
}

export async function get(url, auth) {
  let i = 3;
  while (i--) {
    try {
      const result = await doGetRequest(url, auth);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

function doGetRequest(url, auth) {
  return new Promise((resolve, reject) => {
    const options = {
      url,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: ''
      }
    };

    if (auth) {
      options.headers.Authorization = auth;
    }

    request(options, function (error, response, body) {
      if (error) {
        return reject(error);
      }
      if (response.statusCode === 200) {
        resolve(response.body);
      } else {
        reject(new Error(JSON.stringify(response)));
      }
    });
  });
}
