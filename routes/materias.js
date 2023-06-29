const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

// Obtener las materias
router.get("/api/materias", async function (req, res, next) {
  //Consulta de materias utilizando filtro y paginación
  let where = {};
  if (req.query.Descripcion != undefined && req.query.Descripcion !== "") {
    where.descripcion = {
      [Op.like]: "%" + req.query.Descripcion + "%",
    };
  }

  //Instrucción utilizada para devolver todos los registros, utilizada en el front para registrar un nuevo elemento que utilice como fk a materia
  if (req.query.Pagina == -1) {
    const rows = await db.materias.findAll({
      attributes: [
        "nroMateria",
        "legajoProfesor",
        "legajoAlumno",
        "nroComision",
        "fechaCreacion",
        "descripcion",
      ],
      order: [["descripcion", "ASC"]],
      where,
    });
    return res.json({ Items: rows });
  }
  const Pagina = req.query.Pagina ?? 1;
  const TamañoPagina = 10;
  const { count, rows } = await db.materias.findAndCountAll({
    attributes: [
      "nroMateria",
      "legajoProfesor",
      "legajoAlumno",
      "nroComision",
      "fechaCreacion",
      "descripcion",
    ],
    order: [["descripcion", "ASC"]],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });
  return res.json({ Items: rows, RegistrosTotal: count });
});

// Obtener materia según id
router.get("/api/materias/:nroMateria", async function (req, res, next) {
  let mat = await db.materias.findOne({
    attributes: [
      "nroMateria",
      "legajoProfesor",
      "legajoAlumno",
      "nroComision",
      "fechaCreacion",
      "descripcion",
    ],
    where: { nroMateria: req.params.nroMateria },
  });
  res.json(mat);
});

// Agregar una nueva materia
router.post("/api/materias/", async (req, res) => {
  try {
    let data = await db.materias.create({
      nroMateria: req.body.nroMateria,
      legajoProfesor: req.body.legajoProfesor,
      legajoAlumno: req.body.legajoAlumno,
      nroComision: req.body.nroComision,
      fechaCreacion: req.body.fechaCreacion,
      descripcion: req.body.descripcion,
    });
    res.status(200).json(data.dataValues);
  } catch (e) {
    if (e instanceof ValidationError) {
      let messages = "";
      e.errors.forEach(
        (x) => (messages += (x.path ?? "campo") + ": " + x.message + "\n")
      );
      res.status(400).json({ message: messages });
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
      where: { nroMateria: req.params.nroMateria },
    });
    if (!mat) {
      res.status(404).json({ message: "Articulo no encontrado" });
      return;
    }
    mat.nroMateria = req.body.nroMateria;
    mat.legajoProfesor = req.body.legajoProfesor;
    mat.legajoAlumno = req.body.legajoAlumno;
    mat.nroComision = req.body.nroComision;
    mat.fechaCreacion = req.body.fechaCreacion;
    mat.descripcion = req.body.descripcion;

    await mat.save();
    res.sendStatus(200);
  } catch (e) {
    if (e instanceof ValidationError) {
      let messages = "";
      e.errors.forEach((x) => (messages += x.path + ": " + x.message + "\n"));
      res.status(400).json({ message: messages });
    } else {
      throw e;
    }
  }
});

// Eliminacion de una materia
router.delete("/api/materias/:nroMateria", async (req, res) => {
  let borradoFila = await db.materias.destroy({
    where: { nroMateria: req.params.nroMateria },
  });
  if (borradoFila == 1) res.sendStatus(200);
  else res.sendStatus(404);
});

module.exports = router;
