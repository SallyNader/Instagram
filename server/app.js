const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Startup
require("dotenv").config();
require("./startup/mogodb")();
require("./startup/routes")(app);

app.get("/", (req, res) => {
  res.send("hello");
});
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
