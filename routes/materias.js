const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

// Obtener todas las materias
router.get("/api/materias", async function(req, res, next){
    let mat = await db.materias.findAndCountAll ({
        attributes: [
            "nroMateria",
            "legajoProfesor",
            "legajoAlumno",
            "nroComision",
            "fechaCreacion",
            "descripcion",
        ],
    });
    res.json(mat);
});

// Obtener materia según id
router.get("/api/materias/:nroMateria", async function(req, res, next) {
    let mat = await db.materias.findOne({
        attributes: [
            "nroMateria",
            "legajoProfesor",
            "legajoAlumno",
            "nroComision",
            "fechaCreacion",
            "descripcion",
        ],
        where: {nroMateria: req.params.id},
    });
    res.json(mat);
});

// Agregar una nueva materia
router.post("/api/materias/", async (req, res) =>{
    try {
        let data = await db.materias.create({
            nroMateria: req.body.nroMateria,
            legajoProfesor: req.body.legajoProfesor,
            legajoAlumno: req.body.legajoAlumno,
            nroComision: req.body.nroComision,
            fechaCreacion: req.body.fechaCreacion,
            descripcion: req.body.descripcion,
        });
        res.status(200).json(data.dataValues)
    } catch (e){
        if (e instanceof ValidationError){
            let messages = '';
            e.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
            res.status(400).json({message: messages});
        } else {
            throw e;
        }
    }
});

// Cambiar contenido de una materia
router.put("/api/materias/:nroMateria", async (req, res) => {
    try {
        let mat = await db.materias.findOne({
            attributes: [
                "nroMateria",
                "legajoProfesor",
                "legajoAlumno",
                "nroComision",
                "fechaCreacion",
                "descripcion",
            ],  
            where: {nroMateria: req.params.id},
        });
        if (!mat) {
            res.status(404).json({message: "Articulo no encontrado"});
            return;
        }
        mat.NumeroMateria = req.body.nroMateria;
        mat.LegProfesor = req.body.legajoProfesor;
        mat.LegAlumno = req.body.legajoAlumno;
        mat.NumeroComision = req.body.nroComision;
        mat.FechaCreacion = req.body.fechaCreacion;
        mat.Descripcion = req.body.descripcion;

        await mat.save();
        res.sendStatus(200);
    } catch (e) {
        if (e instanceof ValidationError) {
            let messages = '';
            e.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
            res.status(400).json({message: messages});  
        } else {
            throw e;
        }
    }
});

// Eliminacion de una materia
router.delete("/api/materias/:nroMateria", async (req, res) => {
    let bajaFisica = false;

    if(bajaFisica) {
        let borradoFila = await db.materias.destroy ({
            where: {nroMateria: req.params.id},
        });
        if (borradoFila == 1) res.sendStatus(200);
        else res.sendStatus(404);
    } 
});

module.exports = router;