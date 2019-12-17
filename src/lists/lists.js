const express = require("express");
const listsService = require("./lists-service");
const listsRouter = express.Router();
const jsonBodyParser = express.json();
const usersService = require("../users/users-service");

const { validateBodyTypes } = require("../middleware");

const { keyValidator } = require("../middleware");
const { validateUserExists } = require("../middleware");
const { validateListExists } = require("../middleware");
const { serverError } = require("../middleware");
listsRouter.use(jsonBodyParser);
listsRouter.use(validateBodyTypes);

listsRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    listsService.getAllLists(knexInstance).then(lists => {
      res.json(lists);
    });
  })
  .post(
    validateListNoExists,
    keyValidator(["name", "listcode"]),
    (req, res, next) => {
      const { name, listcode, username, items } = req.body;
      const newlist = {
        name: name,
        listcode: listcode,
        username: username,
        items: []
      };
      listsService.post(newList);
      res.json(listsService.getList(listcode));
    }
  );
listRouter
  .route("/:list_code/list")
  .get(validateListExists, (req, res, next) => {
    res.json(listService.getlist(req.params.list_code));
  })
  .patch(
    validateListExists,

    keyValidator(["newname"]),
    (req, res, next) => {
      const listcode = req.params.list_code;
      const newname = req.body.newname;
      listsService.changeListName(newname, listcode);
      return res.json(listsService.getList(listcode));
    }
  );

function validateListNoExists(req, res, next) {
  const exists = listsService.doesExist(req.body.listcode);
  if (exists) {
    let err = new Error("List already exists");
    err.status = 400;
    next(err);
  }
  next();
}

listssRouter.use(serverError);
module.exports = listsRouter;
