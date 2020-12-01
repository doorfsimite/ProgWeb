const express = require('express');
const router = express.Router();

const handlebars = require("express-handlebars");

router.get('/sobre', function (req, res) {
    res.render('sobre',{layout:false});
});

module.exports = router;