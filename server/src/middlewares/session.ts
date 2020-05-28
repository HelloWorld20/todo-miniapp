/*
 * session中间件
 * @Author: jianghong.wei
 * @Date: 2020-05-27 15:09:20
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2020-05-28 16:21:33
 */

import { Request, Response, NextFunction } from "express";
import { ServiceError, HTTP_STATUS } from "../modules";
import Redis, { IRedisClient } from "../modules/redis";
import * as uuid from "uuid";
import * as config from "../modules/config";
const redisConf = config.get("redis.session");

// session缓存过期时间 一小时
const EXPIRE_TIME = redisConf.expire;
// 小程序session前缀
export const PREFIX = "MINIPROGRAM-SESSION-";
// 小程序session token key
export const TOKEN_HEADER = "x-token";

// redis client
let redisClient: IRedisClient | null;
function getRedisClient() {
  if (!redisClient) {
    redisClient = redisConf ? new Redis(redisConf) : null;
    if (!redisClient) {
      throw new ServiceError(
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "无法获取redisClient"
      );
    }
    return redisClient;
  } else {
    return redisClient;
  }
}

export async function getSession(key: string): Promise<any> {
  const redisClient = getRedisClient();
  let sessionString = await redisClient.get(key);
  if (!sessionString) {
    return null;
  } else {
    try {
      return JSON.parse(sessionString);
    } catch (err) {
      return null;
    }
  }
}

export async function setSession(key: string, data: Record<string, any>) {
  const redisClient = getRedisClient();
  const sessionKey = key ? key : `${PREFIX}${uuid.v4()}`;
  await redisClient.set(sessionKey, JSON.stringify(data), EXPIRE_TIME);
  return sessionKey;
}

export default async function(req: Request, res: Response, next: NextFunction) {
  const token: any = req.get(TOKEN_HEADER) || req.query.token;

  const session = token ? await getSession(token) : {};
  req.session = session
  await setSession(token, session);
  next();
}
