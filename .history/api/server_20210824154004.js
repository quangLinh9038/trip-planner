const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const port = process.env.PORT;
require("dotenv").config();

const routes = require("./server/routes");
const db = require("./server/src/models");
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};

// database connection authentication
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

// sequelize sync
// force: drop table first if exist and create new table
// alter: check current states of changes of tables in database
db.sequelize.sync({ force: false, alter: false }).then(() => {
  console.log("Models synced...");
});

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" })); // increase POST json upto 50mb
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(morgan("short"));

// Routes
app.use("/", routes);

app.listen(port, function () {
  console.log(`Listening  ${port}... `);
  // server.close(function () {
  //   console.log("Doh :(");
  // });
});
module.exports = app;
