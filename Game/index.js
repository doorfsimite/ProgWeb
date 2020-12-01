const express = require("express");
const fs = require('fs');
const path = require('path')
const router = require("./config/routes");

const handlebars = require("express-handlebars");
const logger = require("morgan");

const app = express();

// Log
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(logger("combined",{ stream: accessLogStream }));


// Handlebars
app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.use("/img",express.static(`${__dirname}/images`));
app.use("/style",express.static(`${__dirname}/style`));


// Chamada das rotas

app.use(router);

app.listen(3000);
