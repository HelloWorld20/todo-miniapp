import { createRouter, response, catchError } from "../modules";
import * as todoSrv from "../services/todo";
const router = createRouter();
// 获取当前身份所有列表
router.get(
  "/list",
  catchError(async (req, res) => {
    const result = await todoSrv.getTodoList(req);
    response.json(res, result);
  })
);
// 获取单个todo
router.get(
  "/:id",
  catchError(async (req, res) => {
    const { id } = req.params;
    const result = await todoSrv.getTodoItem(req, id);
    response.json(res, result);
  })
);

router.post(
  "/:id",
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

router.delete(
  "/",
  catchError(async (req, res) => {
    const { ids } = req.body;
    const result = await todoSrv.delTodo(ids);
    response.json(res, result);
  })
);

export default router;
