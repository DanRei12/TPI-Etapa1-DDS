//Se especifican las librerias a usar
require("express-async-errors");
const express = require("express");
const path = require("path");
require("./base-orm/sqlite-init"); // crear base si no existe

// CREACION SERVIDOR
const app = express();


app.use(express.text()); // entiende texto
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // para poder leer json en el body
app.use("/", express.static(path.join(__dirname, "public")));



//console.log("base", process.env.base);
//console.log("NODE_ENV", process.env.NODE_ENV);


// seguridad XSS
//const helmet = require('helmet');
//app.use(helmet());


//------------------------------------
//-- RUTAS ---------------------------
//------------------------------------

//Se importan las routes correspondientes para cada tabla
const alumnosRouters = require("./routes/alumnos");
app.use(alumnosRouters);

const profesorRouters = require("./routes/profesores");
app.use(profesorRouters);

const materiasRouters = require("./routes/materias");
app.use(materiasRouters);

const examenesRouters = require("./routes/examenes");
app.use(examenesRouters);

const comisionesRouters = require("./routes/comisiones");
app.use(comisionesRouters);

//const comisionesRouters = require("./routes/comisiones");
//app.use(comisionesRouters);



/*

//------------------------------------
//-- Control de errores --------------
//------------------------------------
const { errorHandler, _404Handler } = require("./error-handler/errorhandler");
app.use(errorHandler);
app.use(_404Handler);

*/



//------------------------------------
//-- INICIO ---------------------------
//------------------------------------

if (!module.parent) {   // si no es llamado por otro modulo, es decir, si es el modulo principal -> levantamos el servidor
  const port = process.env.PORT || 3000;   // en produccion se usa el puerto de la variable de entorno PORT
  app.locals.fechaInicio = new Date();
  app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
  });
}

module.exports = app; // para testing

