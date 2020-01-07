const express = require("express");
const userService = require("./users-service");
const usersRouter = express.Router();
const jsonBodyParser = express.json();
const { validateBodyTypes } = require("../middleware");
const { keyValidator } = require("../middleware");
const { serverError } = require("../middleware");
const { validateListExists } = require("../middleware");
const { requireAuth } = require("../basic-auth");
//usersRouter.use(validateParamTypes);
usersRouter.use(jsonBodyParser);
usersRouter.use(validateBodyTypes);

usersRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    //res.json(userService.getAllusers());
    userService.getAllusers(knexInstance).then(users => {
      console.log("res.json users ran");
      res.json(users);
    });
  })
  .post(
    keyValidator(["username", "name", "password"]),
    validateDuplicateUser,
    (req, res, next) => {
      const knexInstance = req.app.get("db");
      const { username, name, password } = req.body;
      const newUser = {
        username: username,
        name: name,
        password: password
      };
      userService
        .postNewUserNoList(knexInstance, newUser)
        .then(response => res.json(response));
    }
  );

usersRouter
  .route("/:user_name")
  .get(validateUserExists, (req, res, next) => {
    //res.json(userService.getUser(req.app.get("db"), req.params.user_name));
    userService
      .getUser(req.app.get("db"), req.params.user_name)
      .then(result => {
        res.json(result);
      });
  })
  .patch(
    keyValidator(["newusername"]),
    validateUserExists,
    (req, res, next) => {
      const newusername = req.body.newusername;
      userService
        .changeUsername(req.app.get("db"), req.params.user_name, newusername)
        .then(response => {
          res.json(response);
        });
    }
  );

usersRouter
  .route("/:user_name/name")
  .get(validateUserExists, (req, res, next) => {
    res.json(userService.getNameFromUsername(req.params.user_name));
  })
  .patch(keyValidator(["name"]), validateUserExists, (req, res, next) => {
    userService.changePlayerName(req.body.name, req.params.user_name);
    res.json(userService.getUser(req.params.user_name));
  });

usersRouter
  .route("/:user_name/lists")
  .get(validateUserExists, (req, res, next) => {
    userService.getUserId(req.app.get("db"), req.params.user_name).then(id => {
      userService.getUserLists(req.app.get("db"), id[0].id).then(listIds => {
        res.json(result);
      });
    });
  })
  .post(
    keyValidator(["name", "password", "listcode"]),
    validateDuplicateUser,
    validateListExists,
    (req, res, next) => {
      const { name, password, listcode } = req.body;
      const newUser = {
        username: req.params.user_name,
        name: name.name,
        password: password.password
      };

      userService.postUserWithList(
        req.app.get("db"),
        newUser,
        listcode.listcode
      );
      res.json(userService.getUserLists(req.params.user_name));
    }
  );

usersRouter
  .route("/:user_name/profile")
  .get(validateUserExists, (req, res, next) => {
    res.json(userService.getUserProfile(req.params.user_name));
  });

usersRouter.use(serverError);

function validateUserExists(req, res, next) {
  console.log(
    req.params.user_name,
    "req.params.user_name in validateUserExists"
  );
  userService.userExists(req.app.get("db"), req.params.user_name).then(id => {
    console.log(id, "id in validateUserExists");
    if (!id.length) {
      let err = new Error("User does not exist");
      err.status = 404;
      return next(err);
    }
    next();
  });
}

function validateDuplicateUser(req, res, next) {
  console.log("validateDuplicateUser ran");
  //req.user = userService.userExists(req.app.get("db"), req.params.user_name);

  const username = req.params.user_name
    ? req.params.user_name
    : req.body.username;
  userService.userExists(req.app.get("db"), username).then(id => {
    if (id.length) {
      let err = new Error("User name already exists");
      err.status = 400;
      return next(err);
    }
  });

  next();
}

module.exports = usersRouter;
