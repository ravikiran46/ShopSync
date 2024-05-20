const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = function (req, res, next) {
  // get token from header
  const token = req.header("x-aut-token");

  // check if token is given or not
  if (!token) {
    res.json({ status: 404, msg: "No token provided" });
  }
  // verify token
  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({ msg: "Token is not valid" });
  }
};
