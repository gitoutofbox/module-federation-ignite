const express = require("express");


const db = require('./config/db');
db.sequelize.sync({force: false})
.then(()=> console.log("DB Synced"))
.catch(error => console.log(error));

const PORT = process.env.PORT || 9000;


const app = express();
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}));

const routes = require("./routes/index.route");
app.use(routes);


app.listen(PORT, () => {
    console.log("server started")
})

