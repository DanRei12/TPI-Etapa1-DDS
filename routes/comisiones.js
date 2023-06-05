const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const {Op, ValidationError} = require("sequelize");

//get all
router.get("/api/comisiones", async function (req, res, next) {
    let comision = await db.comisiones.findAll({
        attributes: ["nroComision", "fechaCreacion", "descripcion"],
    });
    res.json(comision);
});


//get one by id
router.get("/api/comisiones/:id", async function (req, res, next) {
    let comision = await db.comisiones.findOne({
        attributes: ["nroComision", "fechaCreacion", "descripcion"], where: {nroComision: req.params.id},
    });
    res.json(comision);
});

//post
router.post("/api/comisiones/", async (req, res) => {
    try {
        const {nroComision, fechaCreacion, descripcion} = req.body;
        const data = await db.comisiones.create({
            nroComision, fechaCreacion, descripcion,
        });
            res.status(200).json(data.dataValues);
        ;
    }catch (err) {
        if (err instanceof ValidationError) {
            let messages = "";
            err.errors.forEach((x) => (messages += (x.path ?? "campo") + ": " + x.message + "\n"));
            res.status(400).json({message: messages});
        } else {
            throw err;
        }
    }
});

//PUT
router.put("/api/comisiones/:id", async (req, res) => {
    try {
        let comision = await db.comisiones.findOne({
            attributes: ["nroComision", "fechaCreacion", "descripcion"], where: {nroComision: req.params.id},
        });
        if (!comision) {
            res.status(404).json({message: "Comisión no encontrada"});
            return;
        }
        comision.nroComision = req.body.nroComision
        comision.fechaCreacion = req.body.fechaCreacion
        comision.descripcion = req.body.descripcion

        await comision.save();
        res.sendStatus(200);
    } catch (err) {
        if (err instanceof ValidationError) {
            // Se devuelven errores de validación.
            let messages = '';
            err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
            res.status(400).json({message: messages});
        } else {
            // En caso de errores desconocidos, los maneja el middleware de errores.
            throw err;
        }
    }
});
//delete
router.delete("/api/comisiones/:id", async (req, res) => {
    try {
        let rowsDelete = await db.comisiones.destroy({
            where: { nroComision: req.params.id },
        });
        if (rowsDelete == 1) res.sendStatus(200);
        else res.sendStatus(404);
    } catch (err) {
        if (err instanceof ValidationError) {
            // Se devuelven errores de validación.
            const messages = err.errors.map((x) => x.message);
            res.status(400).json(messages);
        } else {
            // En caso de errores desconocidos, los maneja el middleware de errores.
            throw err;
        }
    }
});


module.exports = router;
