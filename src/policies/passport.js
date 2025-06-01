const passport = require("passport");
const jwtStrategy = require("../middlewares/passport.js")

const authentication = (req, res, next) => {
  const { User } = connections.models
  jwtStrategy(passport, User)
  return passport.authenticate(
    "jwt",
    { session: false },
    async (err, user, info) => {
      if (err) return next(err);
      if(!user){
        res.message = "UnAuthenticated User";
        return utils.unAuthenticated(res);
      }

      req.userId = user.id;
      req.user = user;

      next()
    }
  )(req, res, next);
}

module.exports = {
  authentication,
}