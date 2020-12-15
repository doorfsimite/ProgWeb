const express = require("express");
const models = require('../models/index');
const Curso = models.Curso;
const User = models.User;
function sobre(req, res) {
    res.render('main/sobre');
}

function login(req, res) {
    res.render('main/login');
}

function ui(req, res) {
    res.render('main/ui');
}

function jogo(req, res) {
    res.render('main/jogo');
}

async function cadastro(req, res) {
    if (req.route.methods.get) {
        const cursos = await Curso.findAll();
        res.render('main/cadastro', { curso: cursos.map(cursos => cursos.toJSON()), reusableValues: req.body });
    }
    else {
        try {
            console.log(req.body);
            if (req.body.senha !== req.body.confirmacao) {
                throw Error("senha não compativel");
            }
            if(typeof req.body.agree != "undefined"){
                user = await User.create({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha,
                    confirmacao: req.body.confirmacao,
                    cursoId: req.body.curso
                });
            }
            else{
                throw Error("Agree");
            }
            
            res.redirect('/signup');
        } catch (e) {
            if (e.message === 'senha não compativel') {
                if(typeof e['errors'] == 'undefined'){
                    e = {}
                }
                e.errors = ([{ path: 'senha', message:'senha não compativel'  }])
            }
            if (e.message === 'Agree') {
                if(typeof e['errors'] == 'undefined'){
                    e = {}
                }
                e.errors = ([{ path: 'agree', message:'Aceite os termos de serviço'  }])
            }
            console.log(e.errors)
            cursos = await Curso.findAll();
            res.render('main/cadastro', {
                curso: cursos.map(cursos => cursos.toJSON()),
                reusableValues: req.body,
                errors: e.errors,
            })


        }
    }

}

module.exports = { sobre, ui, jogo, cadastro,login }
