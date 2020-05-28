import mongo from "../modules/mongodb";
import * as mongoose from "mongoose";

export enum ETodoType {
  ACTION = "ACTION",
  FOUCUSED = "FOUCUSED",
  DESSERT = "DESSERT",
}

const model = {
  openid: String,
  id: String,
  type: String, // 种类：ACTION、FOUCUSED、DESSERT
  urgency: Number, // 紧急性
  significance: Number, // 重要性
  priority: Number, // 优先级
  status: Number, // 状态：-1：删除，1正常
};
const schema = new mongoose.Schema(model);
const COLLECTION = "todo"; // collection是config，则对应的库是configs

export const insert = async (value: any) => {
  return mongo.insert(COLLECTION, schema, value);
};

export const find = async (condition?: any) => {
  return mongo.find(COLLECTION, schema, condition);
};

export const findOne = async (condition: any) => {
  return mongo.find(COLLECTION, schema, condition);
};

export const del = async (condition: any) => {
  return mongo.del(COLLECTION, schema, condition);
};

export const update = async (condition: any, value: Record<string, any>) => {
  return mongo.update(COLLECTION, schema, condition, value);
};

export const getModal = () => {
  return mongo.getModal(COLLECTION, schema);
};
