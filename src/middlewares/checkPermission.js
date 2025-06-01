function checkPermission(req, res, next) {
  if (req.user && req.user.isAdmin) {
    return next();
  } else {
    return utils.failureResponse("you have no permissions", res);
  }
}

module.exports = checkPermission;
