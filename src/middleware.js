const listsService = require("../src/lists/lists-service");

function validateBodyTypes(req, res, next) {
  const possibleStringKeys = [
    "name",
    "listcode",
    "newname",
    "newuser",
    "username",
    "password",
    "newusername"
  ];
  const possibleNumberKeys = ["id"];
  const possibleArrayKeys = ["items", "users"];
  const allPossibleKeys = [
    ...possibleStringKeys,
    ...possibleNumberKeys,
    ...possibleArrayKeys
  ];
  if (req.body && req.body !== {}) {
    const keys = Object.keys(req.body);
    keys.forEach(key => {
      if (allPossibleKeys.includes(key)) {
        if (possibleStringKeys.includes(key)) {
          if (typeof req.body[key] !== "string") {
            let err = new Error(`${key} must be a string`);
            err.status = 400;
            return next(err);
          }
        }
        if (possibleArrayKeys.includes(key)) {
          if (!Array.isArray(req.body[key])) {
            let err = new Error(`${key} must be an array`);
            err.status = 400;
            return next(err);
          }
        }
        if (possibleNumberKeys.includes(key)) {
          if (typeof req.body[key] !== "number") {
            let err = new Error(`${key} must be a number`);
            err.status = 400;
            return next(err);
          }
        }
      } else {
        let err = new Error(`Unexpected key: '${key}' in body`);
        err.status = 400;
        return next(err);
      }
    });
    return next();
  }
  next();
}

function keyValidator(requiredKeys = []) {
  return function(req, res, next) {
    //requiredKeys = req.requiredKeys;
    const keys = Object.keys(req.body) ? Object.keys(req.body) : [];
    requiredKeys.forEach(key => {
      if (!keys.includes(key)) {
        let err = new Error(`Missing key '${key}' in request body`);
        err.status = 400;
        next(err);
      }
    });
    keys.forEach(key => {
      if (req.body[key] === "" || undefined) {
        let err = new Error(`Empty key '${key}' in request body`);
        err.status = 400;
        next(err);
      }
      if (!requiredKeys.includes(key)) {
        let err = new Error(`Unnecessary key '${key}' in request body`);
        err.status = 400;
        next(err);
      }
    });
    next();
  };
}

function validateUserExists(req, res, next) {
  const userName = req.params.user_name
    ? req.params.user_name
    : req.body.username;

  userService.userExists(req.app.get("db"), userName).then(id => {
    if (!id.length) {
      let err = new Error("User does not exist");
      err.status = 404;
      return next(err);
    }
  });
  next();
}

function validateListExists(req, res, next) {
  const list = req.params.list_code ? req.params.list_code : req.body.listcode;

  listsService.doesExist(req.app.get("db"), list).then(id => {
    if (!id.length) {
      let err = new Error("List Does Not Exist");
      err.status = 404;
      return next(err);
    }

    return next();
  });
}

function serverError(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || "Unknown server error";
  return res.status(status).json({
    error: message
  });
}
module.exports = {
  validateBodyTypes,
  keyValidator,
  validateUserExists,
  validateListExists,
  serverError
};
