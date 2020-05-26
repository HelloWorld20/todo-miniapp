/*
 * @Author: jianghong.wei 
 * @Date: 2020-05-20 14:10:10 
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2020-05-26 15:45:35
 * 用户信息，数据库控制
 */

import mongo from "../modules/mongodb";
import * as mongoose from "mongoose";

const model = {
  // 个人信息都是微信的数据
  // city: String,
  // country: String,
  // headimgurl: String,
  // latitude: Number,
  // longitude: Number,
  // nickName: String,
  openid: String,
  // province: String,
  // sex: Number,
  // unionid: Number,
  // userId: Number,
  state: Number, // 用户状态。1：正常。-1：封禁
};

const schema = new mongoose.Schema(model);
const COLLECTION = "user"; // collection是config，则对应的库是configs

export const insert = (value: any) => {
  return mongo.insert(COLLECTION, schema, value);
};

export const find = (condition?: any): any => {
  return mongo.find(COLLECTION, schema, condition);
};

export const findOne = async (condition: any) => {
  return mongo.find(COLLECTION, schema, condition);
};

export const findAggregate = (aggregate: Array<any>) => {
  aggregate.push({ $project: { _id: 0, __v: 0 } });
  const Modal = mongo.getModal(COLLECTION, schema);
  return Modal.aggregate(aggregate);
};

export const del = (condition: any) => {
  return mongo.del(COLLECTION, schema, condition);
};

export const update = (condition: any, value: Record<string, any>) => {
  return mongo.update(COLLECTION, schema, condition, value);
};

export const getModal = () => {
  return mongo.getModal(COLLECTION, schema);
};
