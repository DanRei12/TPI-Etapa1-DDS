const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
//const { Op, ValidationError } = require("sequelize");
//const auth = require("../seguridad/auth");

router.get("/api/alumnos", async function (req, res, next) {

  
    let where = {};
    if (req.query.nombre != undefined && req.query.nombre !== "") {
      where.Nombre = {
        [Op.like]: "%" + req.query.nombre + "%",
      };
    }
   /* if (req.query.fechaIncripcion != undefined && req.query.fechaIncripcion !== "") {
      // true o false en el modelo, en base de datos es 1 o 0
      // convierto el string a booleano
      where.fechaIncripcion = (req.query.fechaIncripcion === 'true'); 
    } */
    const Pagina = req.query.Pagina ?? 1;
    const TamañoPagina = 10;
    const { count, rows } = await db.alumnos.findAndCountAll({
      attributes: [
        "legajoAlumno",
        "nombre",
        "apellido",
        "fechaIncripcion",
        "descripcion",       
      ],
      order: [["Nombre", "ASC"]],
      where,
      offset: (Pagina - 1) * TamañoPagina,
      limit: TamañoPagina,
    });

    return res.json({ Alumnos: rows, RegistrosTotal: count });
    
  });

router.get("/api/alumnos/:id", async function (req, res, next) {
   let alumno1 = await db.alumnos.findOne({
    attributes: [
        "legajoAlumno",
        "nombre",
        "apellido",
        "fechaIncripcion",
        "descripcion",            
    ],
    where: { legajoAlumno: req.params.id },
  });
  res.json(alumno1);
});

router.post("/api/alumnos/", async (req, res) => {
  
  try {
    let data = await db.alumnos.create({
      Legajo: req.body.legajoAlumno,
      Nombre: req.body.nombre,
      Apellido: req.body.apellido,
      FechaInscripcion: req.body.fechaInscripcion,
      Descripcion: req.body.descripcion,
      });
    res.status(200).json(data.dataValues); // devolvemos el registro agregado!
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validacion, los devolvemos
      let messages = '';
      err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
      res.status(400).json({message : messages});
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

router.put("/api/alumnos/:id", async (req, res) => {
  
  try {
    let alumno1 = await db.profesores.findOne({
      attributes: [
        "legajoAlumno",
        "nombre",
        "apellido",
        "fechaIncripcion",
        "descripcion",   
      ],
      where: { legajoAlumno: req.params.id },
    });
    if (!alumno1) {
      res.status(404).json({ message: "Alumno no encontrado" });
      return;
    }
    alumno1.Legajo= req.body.legajoAlumno,
    alumno1.Nombre= req.body.nombre,
    alumno1.Apellido= req.body.apellido,
    alumno1.FechaInscripcion= req.body.fechaInscripcion,
    alumno1.Descripcion= req.body.descripcion,
    
    await alumno1.save();

     res.sendStatus(200);
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validacion, los devolvemos
      let messages = '';
      err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
      res.status(400).json({message : messages});
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

router.delete("/api/alumnos/:id", async (req, res) => {
  
  let bajaFisica = false;

  if (bajaFisica) {
    // baja fisica
    let filasBorradas = await db.alumnos.destroy({
      where: { legajoAlumno: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  }
});

//------------------------------------
//-- SEGURIDAD ---------------------------
//------------------------------------
/* router.get(
  "/api/jwt/alumnos",
  auth.authenticateJWT,
  async function (req, res, next) {
   
    const { rol } = res.locals.user;
    if (rol !== "admin") {
      return res.status(403).json({ message: "usuario no autorizado!" });
    }

    let items = await db.profesores.findAll({
      attributes: [
        "legajoAlumno",
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