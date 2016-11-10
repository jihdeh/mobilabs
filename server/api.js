import koa from "koa";
import mount from "koa-mount";
import cacheControl from "koa-cache-control";
import apiErrorHandler from "../util/api-error-handler";
import { ImageApi as imageApi } from "./routes";


export default function Api() {
  const api = koa();
  api.use(apiErrorHandler);
  api.use(mount("/v1/images", imageApi));
  api.use(function* terminator() {
    return;
  });

  return api;
}
