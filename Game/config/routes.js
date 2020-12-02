const express = require('express');
const router = express.Router();
const mainController = require("../app/controllers/main");

const handlebars = require("express-handlebars");

router.get('/sobre', mainController.sobre);

router.get('/', mainController.index);

module.exports = router;