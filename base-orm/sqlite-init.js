// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/BD-Tpi-DDS.db");
  
  

  let existe = false;
  let res = null;

  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'usuarios'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE TABLE alumno ( legajoAlumno INT, nombre	VARCHAR(10) NOT NULL, apellido VARCHAR(10) NOT NULL, fechaIncripcion DATETIME NOT NULL, descripcion VARCHAR(50), PRIMARY KEY(legajoAlumno));"
    );
    console.log("tabla alumno creada!");
    await db.run(
      "insert into alumno values "
    );
  }

  existe = false;
  sql = "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'articulos'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `
      CREATE TABLE profesor (
        legajoProfesor	INT NOT NULL,
        nombre"	VARCHAR(15) NOT NULL,
        apellido VARCHAR(15) NOT NULL,
        descripcion VARCHAR(50),
        PRIMARY KEY
        (legajoProfesor)
    );

      `
    );
    console.log("tabla profesor creada!");
    await db.run(
        "insert into profesor values "
      );
}


existe = false;
sql = "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'articulos'";
res = await db.get(sql, []);
if (res.contar > 0) existe = true;
if (!existe) {
    await db.run(
        `
        CREATE TABLE comision (
            nroComision INT NOT NULL,
            fechaCreacion DATETIME NOT NULL,
            descripcion VARCHAR(50),
            PRIMARY KEY (nroComision)
        );
        `
    );
    console.log("tabla comision creada!");
    await db.run(
        "insert into comision values "
      );
}



existe = false;
sql = "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'articulos'";
res = await db.get(sql, []);
if (res.contar > 0) existe = true;
if (!existe) {
    await db.run(
        `
        CREATE TABLE materia (
            nroMateria INT NOT NULL,
            legajoProfesor INT NOT NULL,
            legajoAlumno INT NOT NULL,
            nroComision INT NOT NULL,
            fechaCreacion datetime NOT NULL,
            descripcion VARCHAR(100),
            PRIMARY KEY(nroMateria),
            FOREIGN KEY(legajoAlumno) REFERENCES alumno (legajoAlumno),
            FOREIGN KEY(nroComision) REFERENCES comision (nroComision),
            FOREIGN KEY(legajoProfesor) REFERENCES profesor (legajoProfesor)
        );
        `
    );
    console.log("tabla materia creada!");
    await db.run(
        "insert into materia values "
      );
}



existe = false;
sql = "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'articulos'";
res = await db.get(sql, []);
if (res.contar > 0) existe = true;
if (!existe) {
    await db.run(
        `
        CREATE TABLE examen (
            nroMateria INT NOT NULL,
            legajoAlumno INT NOT NULL,
            fechaExamen datetime NOT NULL,
            descripcion VARCHAR(100),
            FOREIGN KEY(nroMateria) REFERENCES materia (nroMateria),
            FOREIGN KEY(legajoAlumno) REFERENCES alumno (legajoAlumno),
            PRIMARY KEY(nroMateria,legajoAlumno)
        );
        `
    );
    console.log("tabla examen creada!");
    await db.run(
        "insert into examen values "
      );
}

db.close();

}


CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;

