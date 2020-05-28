/*
 * 授权认证封装
 * @Author: jianghong.wei
 * @Date: 2020-05-27 12:30:27
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2020-05-28 16:24:32
 */
import Taro from "@tarojs/taro";
import { post } from "./request";

export async function login() {
  const { code } = await Taro.login();
  const res = await post("/api/user/login", { code });
  // res.token;
  // res.userId;
}
