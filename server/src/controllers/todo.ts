import { createRouter, response, catchError } from "../modules";
import * as todoSrv from "../services/todo";
import { auth } from "../middlewares/auth";
const router = createRouter();
// 获取当前身份所有列表
router.get(
  "/list",
  auth,
  catchError(async (req, res) => {
    const result = await todoSrv.getTodoList(req);
    response.json(res, result);
  })
);
// 获取单个todo
router.get(
  "/:id",
  auth,
  catchError(async (req, res) => {
    const { id } = req.params;
    const result = await todoSrv.getTodoItem(req, id);
    response.json(res, result);
  })
);

router.post(
  "/:id",
  auth,
  catchError(async (req, res) => {
    const { id } = req.params;
    const { type, urgency, significance, priority } = req.body;
    const result = await todoSrv.addOrUpdateTodo(
      req,
      {
        type,
        urgency,
        significance,
        priority,
      },
      id
    );
    response.json(res, result);
  })
);

router.post(
  "/",
  auth,
  catchError(async (req, res) => {
    const { type, urgency, significance, priority } = req.body;
    const result = await todoSrv.addOrUpdateTodo(req, {
      type,
      urgency,
      significance,
      priority,
    });
    response.json(res, result);
  })
);

router.delete(
  "/",
  auth,
  catchError(async (req, res) => {
    const { ids } = req.body;
    const result = await todoSrv.delTodo(ids);
    response.json(res, result);
  })
);

export default router;
