const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

router.get("/api/profesores", async function (req, res, next) {
  //Consulta de profesores con paginación y filtro
  let where = {};
  if (req.query.descripcion != undefined && req.query.descripcion !== "") {
    where.descripcion = {
      [Op.like]: "%" + req.query.descripcion + "%",
    };
  }

  //Instrucción utilizada para devolver todos los registros, utilizada en el front para registrar un nuevo elemento que utilice como fk a profesor
  if (req.query.Pagina == -1) {
    const rows = await db.profesores.findAll({
      attributes: ["legajoProfesor", "nombre", "apellido", "descripcion"],
      order: [["descripcion", "ASC"]],
      where,
    });
    return res.json({ Items: rows });
  }
  const Pagina = req.query.Pagina ?? 1;
  const TamañoPagina = 10;
  const { count, rows } = await db.profesores.findAndCountAll({
    attributes: ["legajoProfesor", "nombre", "apellido", "descripcion"],
    order: [["descripcion", "ASC"]],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });

  return res.json({ Items: rows, RegistrosTotal: count });
});

//Bloque de la solicitud get por id, debe devolver el profesor especifico mediante el legajo enviado por parametro
router.get("/api/profesores/:legajoProfesor", async function (req, res, next) {
  let profe = await db.profesores.findOne({
    attributes: ["legajoProfesor", "nombre", "apellido", "descripcion"],
    where: { legajoProfesor: req.params.legajoProfesor },
  });
  res.json(profe);
});

//Bloque de la solicitud post, crea un nuevo registro alumno con los campos del body
router.post("/api/profesores/", async (req, res) => {
  try {
    const { legajoProfesor, nombre, apellido, descripcion } = req.body;
    const data = await db.profesores.create({
      legajoProfesor,
      nombre,
      apellido,
      descripcion,
    });
    res.status(200).json(data.dataValues); // Devuelve los datos del registro agregado
  } catch (err) {
    if (err instanceof ValidationError) {
      // Devuelve errores de validación
      let messages = "";
      err.errors.forEach(
        (x) => (messages += (x.path ?? "campo") + ": " + x.message + "\n")
      );
      res.status(400).json({ message: messages });
    } else {
      // Los errores desconocidos son manejados por el middleware de errores
      throw err;
    }
  }
});

//Bloque de la solicitud put, modifica datos ingresados por body mediante el legajo dado por parametro
router.put("/api/profesores/:legajoProfesor", async (req, res) => {
  try {
    let profe = await db.profesores.findOne({
      attributes: ["legajoProfesor", "nombre", "apellido", "descripcion"],
      where: { legajoProfesor: req.params.legajoProfesor },
    });
    if (!profe) {
      res.status(404).json({ message: "Examen no encontrado" });
      return;
    }
    (profe.legajoProfesor = req.body.legajoProfesor),
      (profe.nombre = req.body.nombre),
      (profe.apellido = req.body.apellido),
      (profe.descripcion = req.body.descripcion),
      await profe.save();
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

//Se realiza la baja fisica de un registro Profesor especifico.
router.delete("/api/profesores/:legajoProfesor", async (req, res) => {
  // baja fisica
  let filasBorradas = await db.profesores.destroy({
    where: { legajoProfesor: req.params.legajoProfesor },
  });
  if (filasBorradas == 1) res.sendStatus(200);
  else res.sendStatus(404);
});

//------------------------------------
//-- SEGURIDAD ---------------------------
//------------------------------------
/* router.get(
  "/api/jwt/profesor",
  auth.authenticateJWT,
  async function (req, res, next) {
   
    const { rol } = res.locals.user;
    if (rol !== "admin") {
      return res.status(403).json({ message: "usuario no autorizado!" });
    }

    let items = await db.profesores.findAll({
      attributes: [
        "legajoProfesor",
        "nombre",
        "apellido",
        "fechaIncripcion",
        "descripcion",   
      ],
      order: [["Nombre", "ASC"]],
    });
    res.json(items);
  }
);
*/
module.exports = router;
