import { createRouter, response, catchError } from "../modules";
import * as userSrv from "../services/user";
const router = createRouter();

router.post(
  "/login",
  catchError(async (req, res) => {
    const { code } = req.body;
    const result = await userSrv.login(req, code);
    response.json(res, result);
  })
);

router.get(
  "/",
  catchError(async (req, res) => {
    const result = await userSrv.getUserInfo(req);
    response.json(res, result);
  })
);

export default router;
