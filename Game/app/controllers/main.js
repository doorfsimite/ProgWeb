const express = require("express");

function sobre (req, res) {
    res.render('main/sobre');
}

function index (req, res) {
    res.render('main/index');
}
module.exports = {sobre , index}
