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


export default router;
