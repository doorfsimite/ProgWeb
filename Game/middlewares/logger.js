const express = require("express");

function logger (tipo){
    if(tipo === "completo"){
        return function(req,res,next){
            console.log("logs completos");
            next();
        }
    }
    if(tipo === "simples"){
        return function(req,res,next){
            console.log("logs simples");
            next();
        }
    }

}
module.exports = logger;