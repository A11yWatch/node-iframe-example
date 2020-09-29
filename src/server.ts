/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import express from "express";
import createIframe from "node-iframe";
import cors from "cors";

import { ROOT } from "./templates";

const app = express();

app.use(createIframe);
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (req, res) => {
  res.send(ROOT);
});

app.get("/iframe", (req, res) => {
  res.createIframe({
    url: decodeURI(String(req.query.url)).replace(
      "http",
      req.protocol === "https" ? "https" : "http"
    ),
    baseHref: !!req.query.baseHref,
  });
});

const server = app.listen(
   0,
  () => console.log(`server listening on port ${server.address().port}!`)
);

export const killServer = () => {
  return new Promise((resolve) => {
    server.close(() => {
      resolve(console.log("HTTP server closed"));
    });
  });
};

export default app;
