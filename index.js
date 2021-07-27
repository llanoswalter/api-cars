require("dotenv").config({ path: "variables.env" });
require("./config/bd");

const express = require("express");
const app = express();
const routes = require("./routes/routes");
const cors = require("cors");
const notFound = require("./middleware/notFound.js");

app.use(cors());
app.use(express.json());

app.use("/", routes());
app.use(notFound);

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };
