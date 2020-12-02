const express = require("express");

function sobre (req, res) {
    res.render('main/sobre');
}

function index (req, res) {
    res.render('main/index');
}

function ui (req, res) {
    res.render('main/ui');
}

function jogo (req, res) {
    res.render('main/jogo');
}
module.exports = {sobre , index, ui, jogo}
