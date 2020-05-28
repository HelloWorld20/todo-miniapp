import app from "./app";
import * as config from "./modules/config";

const port = config.get("port");

app.create().listen(port, () => {
  console.log(`listening on ${port}`);
});
