const express = require("express");
const auth = require("./routes/auth");
const startup = require("./startup/db");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());

/* Prepare Database */
startup();

// Api Routes
app.use("/api/v1/auth", auth);

// app port configuration
const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  console.info(`Listening on port ${port}...`)
);
module.exports = server;
