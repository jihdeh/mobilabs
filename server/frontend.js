"use strict";

import staticCache from "koa-static-cache";
import serve from "koa-static";
import path from "path";
import koa from "koa";
import koaRouter from "koa-router";
import renderApp from "./render-app";
import axios from "axios";

export default function Frontend() {
  const server = koa();
  const router = koaRouter();

  router.get("/", function*() {
    const images = yield axios.get(`https://api.imgur.com/3/gallery/hot/viral/0.json`, {
      headers: {"Authorization": `Client-ID ${process.env.IMGUR_AUHTORIZATION_ID}`}
    })
    const data = {
      imagesList: images.data
    }
    this.body = renderApp(this, "homepage", data);
  });

  return server
    .use(serve(path.join(__dirname, "../static")))
    .use(serve(path.join(__dirname, "../dist")))
    .use(router.routes());
  // .use(staticCache({ maxage: 60 * 1000 })) // Cache all pages for 1 minute
}
