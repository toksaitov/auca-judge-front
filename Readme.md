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

## Communication

*auca-judge-front* responds to the following HTTP requests

**GET** */*

For `/` *auca-judge-front* returns a page with a sample problem.

**POST** */submit*

The `/submit` path is passed from *auca-judge-front* to the *auca-judge-back* to
make a new submission. Refer to [documentation](https://github.com/toksaitov/auca-judge-back)
of the *auca-judge-back* service for more information.

**GET** */submission/<submission ID>*

The `/submission/<submission ID>` path returns information from the status
database about a submission under the specified ID.

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
