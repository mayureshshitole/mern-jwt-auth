const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes");

const db =
  "mongodb+srv://mayuresh:mayuresh2008@cluster0.syhgd.mongodb.net/Users?retryWrites=true&w=majority";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/", routes);

mongoose.connect(db, () => {
  console.log("DB Connected");
});

let port = 5000;
app.listen(port, () => {
  console.log("listening on port", port);
});
