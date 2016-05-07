auca-judge-front
================

![sample](http://i.imgur.com/9CdyTGM.png)

*auca-judge-front* is a web front end for the *auca-judge* system.

Currently *auca-judge-front* just sends a sample page  with scripts to make
submissions to *auca-judge-back* (the build and test orchestrator) and query
results from the status database.

## Prerequisites

* *Node.js*, *npm* `>=4.4.3`, `>=2.15.2`
* *Redis* `>= 3.0.7`
* *MongoDB* `>= 3.2.5`

## Communication

*auca-judge-front* responds to the following HTTP requests

**GET** */*

For `/` *auca-judge-front* returns a page with a sample problem.

**POST** */submit*

The `/submit` path can be passed from *auca-judge-front* to the
*auca-judge-back* to make a new submission. Refer to
[documentation](https://github.com/toksaitov/auca-judge-back) of the
*auca-judge-back* service for more information.

Alternatively, developers can enable an option inside sources to use a task
queue service of the *auca-judge* system. In this case *auca-judge-front* will
create a new task in a task database and add its ID to a task queue database.
Instances of the *auca-judge-queue* service will be notified and one unoccupied
worker will start processing the task as soon as possible.

**GET** */submission/<submission ID>*

The `/submission/<submission ID>` path can be passed from *auca-judge-front* to
the *auca-judge-back* to fetch information about the specified submission. Refer
to [documentation](https://github.com/toksaitov/auca-judge-back) of the
*auca-judge-back* service for more information.

Alternatively, developers can enable an option inside sources to query
information from the status database about a submission under the specified ID
locally.

```json
{
  "id": "submission ID",
  "status": "in progress|building|testing|failed|finished",
  "results": ["passed", "passed", "failed"]
}
```

## Usage

* `npm install`: to install dependencies

* `npm start`: to start the server

## Licensing

*auca-judge-front* is licensed under the MIT license. See LICENSE for the full
license text.

## Credits

*auca-judge-front* was created by [Dmitrii Toksaitov](https://github.com/toksaitov).
