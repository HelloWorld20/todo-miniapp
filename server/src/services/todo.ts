import { ServiceError, HTTP_STATUS } from "../modules";
import { Request } from "express";
import * as dbTodo from "../db/todo";
import * as _ from "lodash";

const Hashids = require("hashids/cjs");

const hashids = new Hashids("todoItem salt", 10);

/**
 * 获取当前账户下
 * @export
 * @param {Request} req
 * @returns
 */
export async function getTodoList(req: Request) {
  const openid: string = req.session && req.session.openid;
  const result = await dbTodo.find({ openid });
  return result;
}

/**
 * 根据id获取单个记录
 * @export
 * @param {Request} req
 * @param {string} id
 * @returns
 */
export async function getTodoItem(req: Request, id: string) {
  if (!id) {
    throw new ServiceError(HTTP_STATUS.BAD_REQUEST, "参数错误");
  }
  const openid: string = req.session && req.session.openid;
  const result = await dbTodo.find({ openid, id });
  if (!result.length) {
    throw new ServiceError(HTTP_STATUS.NOT_FOUND, "找不到对应记录");
  }
  return result;
}
/**
 * 新增或更新记录
 * @export
 * @param {Request} req
 * @param {{
 *     type: dbTodo.ETodoType; // 种类：ACTION、FOUCUSED、DESSERT
 *     urgency: number; // 紧急性
 *     significance: number; // 重要性
 *     priority: number; // 优先级
 *   }} params
 * @param {string} [id]
 * @returns
 */
export async function addOrUpdateTodo(
  req: Request,
  params: {
    type: dbTodo.ETodoType; // 种类：ACTION、FOUCUSED、DESSERT
    urgency: number; // 紧急性
    significance: number; // 重要性
    priority: number; // 优先级
  },
  id?: string
) {
  // @ts-ignore
  if (Object.keys(params).some((item) => params[item] === undefined)) {
    throw new ServiceError(HTTP_STATUS.BAD_REQUEST, "参数错误");
  }

  if (!dbTodo.ETodoType[params.type]) {
    throw new ServiceError(HTTP_STATUS.BAD_REQUEST, "type参数错误");
  }

  const openid: string = req.session && req.session.openid;

  if (id) {
    const result = await dbTodo.update({ openid, id }, params);
    if (!result.nModified) {
      throw new ServiceError(HTTP_STATUS.NOT_FOUND, "没有找到对应记录");
    }
    return result;
  } else {
    const value = {
      openid,
      id: hashids.encode(new Date().getTime()),
      ...params,
    };
    return dbTodo.insert(value);
  }
}
/**
 * 批量删除记录
 * @export
 * @param {Array<string>} ids
 * @returns
 */
export async function delTodo(ids: Array<string>) {
  return dbTodo.getModal().updateMany({ id: { $in: ids } }, { status: -1 });
}
