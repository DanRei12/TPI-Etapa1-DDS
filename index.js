
require("express-async-errors"); // captura errores en promesas, usar async await
const express = require("express");
const path = require("path");
require("./base-orm/sqlite-init"); // crear base si no existe

// crear servidor
const app = express();


//console.log("base", process.env.base);
//console.log("NODE_ENV", process.env.NODE_ENV);


// seguridad XSS
//const helmet = require('helmet');
//app.use(helmet());



// var allowCrossDomain = function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   //res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// }



app.use(express.text()); // entiende texto
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); // para poder leer json en el body

// sirve archivos estaticos
app.use("/", express.static(path.join(__dirname, "public")));




//------------------------------------
//-- SWAGGER
//------------------------------------

/*
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger/swagger_output.json"); //aqui se genera la salida
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

*/


/*

//------------------------------------
//-- RUTAS ---------------------------
//------------------------------------
app.get("/", (req, res) => {
  //res.send("sitio on line, hola mundo!");
  //res.json({message: 'sitio on line'});
  //res.sendfile("./public/index.html");
  //res.sendfile("./img/imagen.jpg");
  res.redirect("/index.html"); // no haria falta, valor por defecto usado por express.static
});

*/

const alumnosRouters = require("./routes/alumnos");
app.use(alumnosRouters);

const profesorRouters = require("./routes/profesores");
app.use(profesorRouters);

const materiasRouters = require("./routes/materias");
app.use(materiasRouters);

const examenesRouters = require("./routes/examenes");
app.use(examenesRouters);

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

