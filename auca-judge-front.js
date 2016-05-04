"use strict";

const util =
  require("util");

const express =
  require("express");
const proxy =
  require("http-proxy-middleware");
/*
  const redis =
    require("redis");
*/
const winston =
  require("winston");

const Server =
  express();
const ServerPort =
  8888;
const BackServerURL =
  "http://0.0.0.0:7070"

/*
  const RedisConnectionOptions =
    null;
  const Redis =
    redis.createClient(
      RedisConnectionOptions
    );
*/

const Logger =
  new winston.Logger({
    transports: [new winston.transports.Console()]
  });

function getSubmissionInformation(submissionID, onResultCallback) {
  /* ToDo: get submission status as a hash from Redis under the key `submissionID` */

}

/*
  Redis.on("error", error => {
    Logger.error("The redis client has encountered an error");
    Logger.error(error);
  });
*/

Server.use(express.static("public"));
Server.use(proxy(["/submit", "/submissions"], { "target": BackServerURL })); /* ToDo: remove the `/submissions` path and handle it locally */

Server.listen(ServerPort, () => {
  Logger.info(`auca-judge-front is listening on port ${ServerPort}.`);
});
