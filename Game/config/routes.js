const express = require('express');
const router = express.Router();
const mainController = require("../app/controllers/main");
const areaController = require("../app/controllers/area");
const cursoController = require('../app/controllers/curso');
const handlebars = require("express-handlebars");

router.get('/sobre'    , mainController.sobre);
router.get('/'         , mainController.sobre);
router.get('/jogo'     , mainController.jogo);
router.get('/ui'       , mainController.ui);
router.get('/signup'   , mainController.cadastro);
router.post('/signup'  , mainController.cadastro);
router.get('/login' ,    mainController.login);

router.get('/area'     , areaController.index);


//CursoController
router.get('/curso'             , cursoController.index);
router.get('/cursos'            , cursoController.list);
router.get('/curso/read/:id'    , cursoController.read);

router.get('/curso/create'      , cursoController.create);
router.post('/curso/create'     , cursoController.create);

// router.get('/curso/update/:id'  , cursoController.update);
// router.post('/curso/update/:id' , cursoController.update);

// router.post('/curso/remove/:id' , cursoController.remove);

module.exports = router;