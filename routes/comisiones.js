const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

//Bloque de la solicitud get.
router.get("/api/comisiones", async function (req, res) {
    // consulta de comisiones con filtros y paginacion
  let where = {};
  if (req.query.descripcion != undefined && req.query.descripcion !== "") {
    where.descripcion = {
      [Op.like]: "%" + req.query.descripcion + "%",
    };
  }

  //Instrucción utilizada para devolver todos los registros, utilizada en el front para registrar un nuevo elemento que utilice como fk a comisión
  if (req.query.Pagina == -1) {
    const rows = await db.comisiones.findAll({
    attributes: ["nroComision", "fechaCreacion", "descripcion"],
    order: [["descripcion", "ASC"]],
    where});
      return res.json({Items: rows});
  }
  const Pagina = req.query.Pagina ?? 1;
  const TamañoPagina = 10;
  const { count, rows } = await db.comisiones.findAndCountAll({
    attributes: ["nroComision", "fechaCreacion", "descripcion"],
    order: [["descripcion", "ASC"]],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });

  return res.json({ Items: rows, RegistrosTotal: count });
});

//get one by id
router.get("/api/comisiones/:id", async function (req, res, next) {
  let comision = await db.comisiones.findOne({
    attributes: ["nroComision", "fechaCreacion", "descripcion"],
    where: { nroComision: req.params.id },
  });
  res.json(comision);
});

//post, añade un registro comisión
router.post("/api/comisiones/", async (req, res) => {
  try {
    const { nroComision, fechaCreacion, descripcion } = req.body;
    const data = await db.comisiones.create({
      nroComision,
      fechaCreacion,
      descripcion,
    });
    res.status(200).json(data.dataValues);
  } catch (err) {
    if (err instanceof ValidationError) {
      let messages = "";
      err.errors.forEach(
        (x) => (messages += (x.path ?? "campo") + ": " + x.message + "\n")
      );
      res.status(400).json({ message: messages });
    } else {
      throw err;
    }
  }
});

//PUT, modifica datos de un registro en especifico
router.put("/api/comisiones/:id", async (req, res) => {
  try {
    let comision = await db.comisiones.findOne({
      attributes: ["nroComision", "fechaCreacion", "descripcion"],
      where: { nroComision: req.params.id },
    });
    if (!comision) {
      res.status(404).json({ message: "Comisión no encontrada" });
      return;
    }
    comision.nroComision = req.body.nroComision;
    comision.fechaCreacion = req.body.fechaCreacion;
    comision.descripcion = req.body.descripcion;

    await comision.save();
    res.sendStatus(200);
  } catch (err) {
    if (err instanceof ValidationError) {
      // Se devuelven errores de validación.
      let messages = "";
      err.errors.forEach((x) => (messages += x.path + ": " + x.message + "\n"));
      res.status(400).json({ message: messages });
    } else {
      // En caso de errores desconocidos, los maneja el middleware de errores.
      throw err;
    }
  }
});

//delete, baja fisica de un registro Comision
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
