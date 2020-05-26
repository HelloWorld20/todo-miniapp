import * as authSrv from "./auth";
import * as dbUser from "../db/user";
import { Request } from "express";
import { ServiceError, HTTP_STATUS } from "../modules";

const Hashids = require("hashids/cjs");

const hashids = new Hashids("userinfo salt", 10);

/**
 * 登陆：从微信服务器获取openid。如果新用户，新建用户
 * @export
 * @param {Request} req
 * @param {string} code Taro.login生成的code
 * @returns {Promise<string>}
 */
export async function login(req: Request, code: string): Promise<string> {
  const { openid } = await authSrv.getUserInfo(code);
  if (req.session) {
    req.session.openid = openid;
  }

  dbUser.findOne({ openid }).then((userInfo) => {
    if (!userInfo) {
      const value = {
        openid,
        userId: hashids.encode(new Date().getTime()),
        state: 1,
      };
      dbUser.insert(value);
    }
  });

  return "登陆成功";
}
/**
 * 获取用户信息
 * @export
 * @param {Request} req
 * @returns
 */
export async function getUserInfo(req: Request): Promise<Record<string, any>> {
  const openid: string = req.session && req.session.openid;

  if (!openid) {
    throw new ServiceError(HTTP_STATUS.UNAUTHORIZED, "未登录");
  }

  const userInfo = await dbUser.findOne({ openid });

  if (!userInfo) {
    throw new ServiceError(HTTP_STATUS.UNAUTHORIZED, "找不到用户");
  }

  if ((userInfo as any).state === -1) {
    throw new ServiceError(HTTP_STATUS.FORBIDDEN, "用户被封禁");
  }

  return userInfo;
}
