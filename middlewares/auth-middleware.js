const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.js");

const checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];

      const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log(userID);

      // Get User from Token
      req.user = await UserModel.findById(userID).select("-password");
      console.log(req.user);

      next();
    } catch (error) {
      res.send({ status: "failed", message: "Unauthorized User" });
      console.log(error);
    }
  }

  if(!token){
    res.status(401).send({"status": "failed", "message": "Unauthorized User No Token"});
  }
};


const userById = async (req, res, next) => {
  let token = req.params.token;
  console.log(token);
  // Verify and decode the token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      // Handle token verification error
      return res.status(401).json({ error: "Token verification  failed" });
    }

    // Use the decoded object to get the user's ID
    const userId = decoded.userID;
    console.log(decoded);


    UserModel.findById(userId)
      .exec()
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        req.profile = user;
        next();
      })
      .catch((err) => {
        return res.status(500).json({ error: "Internal server error" });
      });
  });
};

module.exports = {checkUserAuth, userById};
