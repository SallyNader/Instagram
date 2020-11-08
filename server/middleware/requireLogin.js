const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const { User } = require("../models/user");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(req.header.authorization);

  if (!authorization) {
    return res.status(401).json({ error: "you must be logged in" });
  }

  const token = authorization.replace("Bearer ", "");

  const valid = await jwt.verify(token, JWT_SECRET);
  console.log(valid);
  if (!valid) {
    return res.status(401).json({ error: "You must be logged in." });
  }
  const { _id } = valid;
  const userDate = await User.findById(_id);
  req.user = userDate;
  next();
};
