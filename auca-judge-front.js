"use strict";

const util =
  require("util");

const express =
  require("express");
const proxy =
  require("http-proxy-middleware");
const redis =
  require("redis");
const winston =
  require("winston");

const Server =
  express();
const ServerPort =
  8888;
const BackServerURL =
  "http://0.0.0.0:7070"

const RedisConnectionOptions =
  null;
const Redis =
  redis.createClient(
    RedisConnectionOptions
  );

const Logger =
  new winston.Logger({
    transports: [new winston.transports.Console()]
  });

function getSubmissionInformation(submissionID, onResultCallback) {
  Redis.hgetall(submissionID, (error, submission) => {
    if (!error) {
      if (submission) {
        let results =
          submission["results"];

        if (results) {
          submission["results"] =
            results.split(",");
        }
      }
    }

    onResultCallback(error, submission);
  });
}

Redis.on("error", error => {
  Logger.error("The redis client has encountered an error");
  Logger.error(error);
});

Server.use(express.static("public"));
Server.use(proxy("/submit", { "target": BackServerURL }));

Server.get("/submissions/:id", (request, response) => {
  let submissionID =
    request.params["id"];

  let processError = parameters => {
    let code =
      parameters["code"];
    let message =
      parameters["message"];
    let responseMessage =
      parameters["response"] || message;
    let error =
      parameters["error"];

    if (message) {
      Logger.error(`${message}\n`);
    }
    if (error)   {
      Logger.error(`exception:\n${error}\n`);
    }
    if (request) {
      Logger.error(`request:\n${util.inspect(request, { "depth": 2 })}\n`);
    }

    if (code && response && responseMessage) {
      response.status(code).json({
        "error": responseMessage
      });
    }
  }

  if (!submissionID) {
    processError({
      "code": 400,
      "message": "The submission ID was not provided."
    });

    return;
  }

  getSubmissionInformation(submissionID, (error, submission) => {
    if (error) {
      processError({
        "code": 400,
        "response": "Invalid submission ID.",
        "error": error,
        "message": "Failed to find a submission with the " +
                   `ID '${submissionID}'.`
      });

      return;
    }

    response.json(submission);
  });
});

Server.listen(ServerPort, () => {
  Logger.info(`auca-judge-front is listening on port ${ServerPort}.`);
});
