const { AuthService } = require("./authService");
const usersService = require("./users/users-service");
function requireAuth(req, res, next) {
  const authToken = req.get("Authorization") || "";

  if (!authToken.toLowerCase().startsWith("basic")) {
    let err = new Error("Missing Authorization");
    err.status = 401;
    return next(err);
  } else {
    basicToken = authToken.slice("basic".length, authToken.length);
  }

  const [tokenUserName, tokenPassword] = AuthService.parseBasicToken(
    basicToken
  );

  if (!tokenUserName || !tokenPassword) {
    let err = new Error("Unauthorized request ");
    err.status = 401;
    return next(err);
  }
  usersService.userExists(req.app.get("db"), tokenUserName).then(user => {
    if (user.length === 0) {
      let err = new Error("Unauthorized request ");
      err.status = 401;
      return next(err);
    } else {
      usersService
        .getUser(req.app.get("db"), tokenUserName)
        .then(userObject => {
          user = userObject[0];
          if (user.password !== tokenPassword) {
            let err = new Error("Unauthorized request 3");
            err.status = 401;
            return next(err);
          }
          return next();
        });
    }
  });

  //next();
}

module.exports = {
  requireAuth
};