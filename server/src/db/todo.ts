import mongo from '../modules/mongodb';
import * as mongoose from 'mongoose';

enum ETodoType {
    ACTION = "ACTION",
    FOUCUSED = "FOUCUSED",
    DESSERT = "DESSERT"
}

const model = {
    openid: String,
    type: ETodoType,   // 种类：ACTION、FOUCUSED、DESSERT
    urgency: Number,    // 紧急性
    significance: Number,   // 重要性
    priority: Number,   // 优先级
 };
const schema = new mongoose.Schema(model);
const COLLECTION = 'todo'; // collection是config，则对应的库是configs

export const insert = async (value: any) => {
	return mongo.insert(COLLECTION, schema, value);
};

export const find = async (condition?: any) => {
	return mongo.find(COLLECTION, schema);
};

export const findOne = async (condition: any) => {
    return mongo.find(COLLECTION, schema, condition);
}

export const del = async (condition: any) => {
	return mongo.del(COLLECTION, schema, condition);
};

export const update = async (condition: any, value: Record<string, any>) => {
	return mongo.update(COLLECTION, schema, condition, value);
};
