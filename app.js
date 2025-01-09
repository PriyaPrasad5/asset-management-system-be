const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const dotenv = require("dotenv").config();


app.listen(process.env.PORT || 4000, () => {
  console.log(`Now listening on port ${process.env.PORT || 4000}`);
});
