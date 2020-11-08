const express = require("express");
const users = require("../routes/users");
const authOld = require("../routes/auth-old");
const auth = require("../routes/auth");
const posts = require("../routes/posts");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/auth-old", authOld);
  app.use("/api/auth", auth);
  app.use("/api/user", users);
  app.use("/api/post", posts);
};
