const express = require('express');
const router = express.Router();
const mainController = require("../app/controllers/main");

const handlebars = require("express-handlebars");

router.get('/sobre'    , mainController.sobre);
router.get('/'         , mainController.index);
router.get('/game'       , mainController.jogo);
router.get('/ui'       , mainController.ui);

module.exports = router;