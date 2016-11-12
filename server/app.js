// app-server.js
import mount from "koa-mount";
import koa from "koa";
import logger from "koa-logger";
import responseTime from "koa-response-time";
// import etag from "koa-etag";

import forward from "koa-forward-request";

import Api from "./api";
import Frontend from "./frontend";

function App() {
  const app = koa();

  forward(app);
  app
    .use(responseTime())
    .use(logger())
    // .use(etag()) //IN A REAL PRODUCTION SCENARIO, MAKE SURE TO UNCOMMENT THIS LINE, TO ENABLE FAST LOADING OF IMAGES
    .use(mount("/api", Api()))
    .use(mount("/", Frontend()));
  return app;
}
export default App;
