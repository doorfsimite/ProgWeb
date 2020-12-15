const models = require('../models/index');
const Area = models.Area;
const Curso = models.Curso;

async function index(req, res) {
    const cursos = await Curso.findAll();
    res.render('curso',{cursos: cursos.map(cursos => cursos.toJSON())});
};

async function read(req, res) {
    const cursoId = req.params.id;
    const curso = await Curso.findByPk(cursoId,{ include: models.Area});
    res.render('curso/cursoInfo',curso.toJSON());
};

async function list(req, res) {
    const cursos = await Curso.findAll({ include: models.Area});
    console.log(cursos.map(cursos => cursos.toJSON()));
    res.render('curso/cursosList', {cursos: cursos.map(cursos => cursos.toJSON())});
};

const create = async function (req, res) {
    if (req.route.methods.get) {
        const areas = await Area.findAll();
        res.render('curso/create', { areas: areas.map(area => area.toJSON()) });
    }
    else {
        try {
            console.log(req.body)
            curso = await Curso.create({
                sigla: req.body.sigla,
                nome: req.body.nome,
                descricao: req.body.descricao,
                areaId: Number.parseInt( req.body.area),
            });
            res.redirect('/curso/read/'+curso.id);
        } catch (e) {
            console.log(e)
            const areas = await Area.findAll();
            res.render('curso/create', {
                curso: req.body,
                errors: e.errors,
                areas: areas.map(area => area.toJSON()) 
            });
        }
    }
}

async function update(req, res) { };
async function remove(req, res) { };

module.exports = { index, read, create, update, remove, list }