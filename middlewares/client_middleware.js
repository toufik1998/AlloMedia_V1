function checkClient(req, res, next) {
  const role = req.user.role.name;
  if (role !== "client") {
    return res
      .status(403)
      .send({
        status: "failed",
        message: "Access denied, forbidden, not ur role",
      });
  }

  next();
}


module.exports =  checkClient ;