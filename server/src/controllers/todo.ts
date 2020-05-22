import { createRouter, response, catchError } from '../modules';
import * as todoSrv from '../services/todo';
const router = createRouter();

router.get(
	'/list',
	catchError(async (req, res) => {
		const result = await todoSrv.getTodoList(req);
		response.json(res, result);
	})
);

router.get(
	'/:id',
	catchError(async (req, res) => {
        const {id} = req.params;
		const result = await todoSrv.getTodoItem(req, id);
		response.json(res, result);
	})
);

export default router;