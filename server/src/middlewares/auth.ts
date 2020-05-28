/*
 * @Author: jianghong.wei
 * @Date: 2019-11-13 18:50:28
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2020-05-28 16:20:39
 * 是否登陆判断中间件
 */

import { Request, Response, NextFunction } from "express";
import { ServiceError, HTTP_STATUS } from "../modules/error";

export const auth = function(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.openid) {
    next();
    return;
  }
  // 以后改为，执行微信授权登录，而不是仅仅报个错。
  throw new ServiceError(HTTP_STATUS.UNAUTHORIZED, "用户未登录");
};
