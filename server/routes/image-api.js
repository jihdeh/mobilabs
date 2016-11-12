import koa from "koa";
import koaRouter from "koa-router";
import bodyParser from "koa-bodyparser";
import queryRoutes from "../base/images/query-routes";

const api = koa();
const router = koaRouter();

api.use(bodyParser());

router.get("/:section/:sort", queryRoutes.routeOne);
router.get("/:section/:sort/:windowSort", queryRoutes.routeTwo);

api
  .use(router.routes())
  .use(router.allowedMethods());

export default api;
