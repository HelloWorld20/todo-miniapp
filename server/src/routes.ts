import service from "./controllers/service";
import user from "./controllers/user";
import todo from "./controllers/todo";

export default {
  "/api/service": service,
  "/api/user": user,
  "/api/todo": todo,
};
