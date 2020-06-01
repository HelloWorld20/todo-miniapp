/*
 * 授权认证封装
 * @Author: jianghong.wei
 * @Date: 2020-05-27 12:30:27
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2020-05-28 16:58:38
 */
import Taro from "@tarojs/taro";
import { auth } from "../apis/user";
import store from "../store";

import { save } from "../actions/auth";

const { dispatch } = store;

export async function login() {
  const { code } = await Taro.login();
  const userId = await auth(code);

  dispatch(save(code));

  return userId;
}
