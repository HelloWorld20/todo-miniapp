import { post } from "../utils/request";

export const auth = code => post("/api/user/login", { code });
