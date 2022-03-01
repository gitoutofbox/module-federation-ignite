const express = require("express");
const cors = require("cors");

const db = require("./config/db");
db.sequelize
  .sync({ force: false })
  .then(() => console.log("DB Synced"))
  .catch((error) => console.log(error));

const PORT = process.env.PORT || 9000;

const app = express();
const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require("./routes/index.route");
app.use(routes);

app.listen(PORT, () => {
  console.log("server started");
});
