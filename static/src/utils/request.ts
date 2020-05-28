/*
 * 接口请求封装
 * @Author: jianghong.wei
 * @Date: 2020-05-27 14:19:26
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2020-05-28 16:23:33
 */
import Taro from "@tarojs/taro";

const HOST = "http://localhost.rabbitpre.com:4000";

class Request {
  constructor() {}

  static interceptor = {
    request: params => {
      params.url = HOST + params.url;
      params.header = {
        'x-token': 'tokenstring'
      }
      return params;
    },
    response: res => {
      console.log("接口成功回调:", res);
      return res.data.data;
    },
    errorHandler: err => {
      console.warn("接口错误回调:", err);
    }
  };

  request = (url: string, opts?, method = "GET") => {
    return new Promise((resolve, reject) => {
      const params = Request.interceptor.request({
        ...opts,
        url,
        method
      });
      console.log("before request");
      Taro.request({
        ...params,
        success: res => {
          if (res.statusCode === 200 || res.statusCode === 304) {
            resolve(Request.interceptor.response(res));
          } else {
            reject(Request.interceptor.errorHandler(res));
          }
        },
        error: err => {
          reject(Request.interceptor.errorHandler(err));
        }
      });
    });
  };
  get = (url, data, opts?) => this.request(url, { ...opts, data }, "GET");
  post = (url, data, opts?) => this.request(url, { ...opts, data }, "POST");
  del = (url, data, opts?) => this.request(url, { ...opts, data }, "DELETE");
  put = (url, data, opts?) => this.request(url, { ...opts, data }, "PUT");
}

const request = new Request();

export const get = request.get;
export const post = request.post;
export const del = request.del;
export const put = request.put;

export default request;
