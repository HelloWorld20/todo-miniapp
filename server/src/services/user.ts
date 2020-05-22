import { ServiceError, HTTP_STATUS } from "../modules";
import { Request } from "express";
import * as dbTodo from "../db/todo";
import * as _ from "lodash";

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
  return result;
}

export async function addOrUpdate(
  req: Request,
  value: Record<string, any>,
  id?: string
) {
  if (!value) {
    throw new ServiceError(HTTP_STATUS.BAD_REQUEST, "参数错误");
  }
  const openid: string = req.session && req.session.openid;

  if (id) {
    const info = await dbTodo.findOne({openid, id});
  } else {
    
  }
}
