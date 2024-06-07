const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotEnv = require("dotenv");
const mySqlPool = require("./config/db");

// dotenv config
dotEnv.config();

// rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));

//routers
app.use("/api/v1/student", require("./routes/studentRoutes"));

app.get("/test", (req, res) => {
  res.status(200).send(`<h2>The server is running`);
});

// port
const PORT = process.env.PORT || 8000;

// conditionally listen
mySqlPool
  .query("SELECT 1")
  .then(() => {
    // mysql
    console.log("MySQL DB connected".bgBlue.black);
    // listener
    app.listen(PORT, () => {
      console.log(`Running Server on Port ${process.env.PORT}`.bgMagenta.white);
    });
  })
  .catch((err) => {
    console.log(err.status);
  });
