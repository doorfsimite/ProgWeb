const express = require("express");
const fs = require('fs');
const path = require('path')
const router = require("./config/routes");
const sass = require("node-sass-middleware");

const handlebars = require("express-handlebars");
const logger = require("morgan");

const app = express();

// Log
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(logger("combined",{ stream: accessLogStream }));


// Handlebars
app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/app/views`);

//assets
app.use("/img",express.static(`${__dirname}/public/img`));
app.use("/css",express.static(`${__dirname}/public/css`));
app.use("/webfonts",express.static(`${__dirname}/node_modules/@fortawesome/fontawesome-free/webfonts`));

//sass
app.use(sass({
    src: `${__dirname}/public/scss`,
    dest: `${__dirname}/public/css`,
    outputStyle: 'compressed',
    prefix: '/css'
}));

app.use("/js",[
    express.static(__dirname + '/public/js/'),
    express.static(__dirname + '/node_modules/jquery/dist/') ,
    express.static(__dirname + '/node_modules/popper.js/dist/umd'),
    express.static(__dirname + '/node_modules/bootstrap/dist/js'),

]);

// Chamada das rotas
app.use(router);

app.listen(3000);
