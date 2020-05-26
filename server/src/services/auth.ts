import * as config from "../modules/config";
import { ServiceError, HTTP_STATUS } from "../modules";
import axios from "axios";

const appid = config.get("wechat.AppId");
const secret = config.get("wechat.AppSecret");

export async function getUserInfo(
  js_code: string
): Promise<{
  session_key: string;
  openid: string;
}> {
  const url = `https://api.weixin.qq.com/sns/jscode2session`;

  const res = await axios.get(url, {
    params: {
      appid,
      secret,
      js_code,
      grant_type: "authorization_code",
    },
  });

  if (res.data.errcode) {
    throw new ServiceError(HTTP_STATUS.FORBIDDEN, res.data.errmsg);
  }
  return res.data;
}
