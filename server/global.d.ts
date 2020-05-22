interface UserInfo {
	city: string;
	country: string;
	headimgurl: string;
	latitude: number | null;
	longitude: number | null;
	nickName: string;
	openid: string;
	province: string;
	sex: number;
	unionid: string;
	userId: number;
	state: -1 | 1; // 用户状态-1：封禁；1：正常
}
