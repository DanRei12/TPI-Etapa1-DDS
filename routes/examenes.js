//Se importan los módulos a utilizar
const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

//Se realiza la solicitud de consulta mediante get, obteniendo todos los datos de todos los exámenes
router.get('/api/examenes', async function (req, res, next){
    let data = await db.examenes.findAll({
        attributes: ["nroMateria","legajoAlumno","fechaExamen","descripcion"],
    });
    res.json(data);
});

//Se realiza la solicitud para un examen en especifico, mediante el id (nroMateria)
router.get("/api/examenes/:id", async function (req, res, next) {
    let examen = await db.examenes.findOne({
      attributes: [
        "nroMateria",
        "legajoAlumno",
        "fechaExamen",
        "descripcion",
      ],
      where: { nroMateria: req.params.id },
    });
    res.json(examen);
});

//Se realiza la solicitud post para el ingreso de un nuevo registro Examen en la base de datos.
/*router.post("/api/examenes/", async (req, res) => {
    try {
      let data = await db.examenes.create({
        nroMateria: req.body.nroMateria,
        legajoAlumno: req.body.legajoAlumno,
        fechaExamen: req.body.fechaExamen,
        descripcion: req.body.descripcion,
      });
      res.status(200).json(data.dataValues); // Se devuelven datos del registro agregado
    } catch (err) {
      if (err instanceof ValidationError) {
        // Se devuelven errores de validación.
        let messages = '';
        err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
        res.status(400).json({message : messages});
      } else {
        // En caso de errores desconocidos, los maneja el middleware de errores.
        throw err;
      }
    }
});
*/

router.post("/api/examenes/", async (req, res) => {
    try {
      const { nroMateria, legajoAlumno, fechaExamen, descripcion } = req.body;
      const data = await db.examenes.create({
        nroMateria,
        legajoAlumno,
        fechaExamen,
        descripcion,
      });
      res.status(200).json(data.dataValues); // Devuelve los datos del registro agregado
    } catch (err) {
      if (err instanceof ValidationError) {
        // Devuelve errores de validación
        let messages = "";
        err.errors.forEach((x) => (messages += (x.path ?? "campo") + ": " + x.message + "\n"));
        res.status(400).json({ message: messages });
      } else {
        // Los errores desconocidos son manejados por el middleware de errores
        throw err;
      }
    }
  });
  
//Cambio de datos especificos de un registro Examen
router.put("/api/examenes/:id", async (req, res) => {
    try {
      let exa = await db.examenes.findOne({
        attributes: [
            "nroMateria",
            "legajoAlumno",
            "fechaExamen",
            "descripcion",
          ],
        where: { nroMateria: req.params.id },
      });
      if (!exa) {
        res.status(404).json({ message: "Examen no encontrado" });
        return;
      }
      exa.nroMateria = req.body.nroMateria,
      exa.legajoAlumno = req.body.legajoAlumno,
      exa.fechaExamen = req.body.fechaExamen,
      exa.descripcion = req.body.descripcion,
      
      await exa.save();
      res.sendStatus(200);
    } catch (err) {
      if (err instanceof ValidationError) {
        // Se devuelven errores de validación.
        let messages = '';
        err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
        res.status(400).json({message : messages});
      } else {
        // En caso de errores desconocidos, los maneja el middleware de errores.
        throw err;
      }
    }
});

//Se realiza la baja fisica de un registro Examen especifico.
router.delete("/api/examenes/:id", async (req, res) => {
      try {
        let rowsDelete = await db.examenes.destroy({
            where: { nroMateria: req.params.id },
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
