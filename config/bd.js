const mongoose = require("mongoose");

require("dotenv").config({ path: "variables.env" });
const contectionsString = process.env.bd_string;

mongoose
  .connect(contectionsString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });
