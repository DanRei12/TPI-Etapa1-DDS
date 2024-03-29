// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/BD-Tpi-DDS.db");
  //Desactiva temporalmente las fk para poder borrar registros que sean usados por otras tablas
  await db.run("PRAGMA foreign_keys = OFF");

  let existe = false;
  let res = null;

  (sqlAlumnos =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'alumnos'"),
    (res = await db.get(sqlAlumnos, []));
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE TABLE alumnos ( legajoAlumno INT NOT NULL, nombre	VARCHAR(10) NOT NULL, apellido VARCHAR(10) NOT NULL, fechaInscripcion DATE NOT NULL, descripcion VARCHAR(50), PRIMARY KEY(legajoAlumno));"
    );
    console.log("tabla alumnos creada!");
    await db.run(
      `INSERT INTO alumnos (legajoAlumno, nombre, apellido, fechaInscripcion, descripcion)
      VALUES (83231, 'Juan', 'Ramonda', '2019-12-10', 'Estudiante destacado'),
      (82345, 'Federica', 'López', '2019-11-20', 'Estudiante destacado'),
      (80203, 'Carlos', 'Rodríguez', '2018-11-15', 'Estudiante promedio'),
      (79023, 'Ana', 'Zabala', '2018-11-20', 'Estudiante destacado'),
      (85314, 'Laura', 'Torres', '2020-11-27', 'Estudiante promedio'),
      (90223, 'Diego', 'Damiani', '2021-11-30', 'Estudiante promedio'),
      (75231, 'Sofía', 'Palacios', '2017-11-28', 'Estudiante destacado'),
      (75094, 'Javier', 'Valdez', '2017-12-01', 'Estudiante destacado'),
      (91456, 'Valeria', 'Molinas', '2021-11-05', 'Estudiante promedio'),
      (89412, 'Joaquín', 'Pelosi', '2020-11-19', 'Estudiante destacado');  
      `
    );
  }

  existe = false;
  sqlProfesores =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'profesores'";
  res = await db.get(sqlProfesores, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `
      CREATE TABLE profesores (
        legajoProfesor	INT NOT NULL,
        nombre VARCHAR(15) NOT NULL,
        apellido VARCHAR(15) NOT NULL,
        descripcion VARCHAR(50),
        PRIMARY KEY (legajoProfesor)
        );

      `
    );
    console.log("tabla profesores creada!");
    await db.run(
      `INSERT INTO profesores (legajoProfesor, nombre, apellido, descripcion)
        VALUES (10231, 'Juan', 'González', 'Profesor de Álgebra'),
        (11235, 'María', 'López', 'Profesora de Desarrollo de Software'),
        (12355, 'Pedro', 'Martínez', 'Profesor de Ciber Seguridad'),
        (15246, 'Laura', 'Rodríguez', 'Profesora de Física 1'),
        (17235, 'Carlos', 'García', 'Profesor de Física 2'),
        (20241, 'Ana', 'Fernández', 'Profesora de Química'),
        (12345, 'Luis', 'Pérez', 'Profesor de Análisis Numerico'),
        (25234, 'Elena', 'Gómez', 'Profesora de Diseño de Sistemas de Información'),
        (28414, 'Diego', 'Sánchez', 'Profesor de Inglés 1'),
        (30123, 'Mariana', 'Figal', 'Profesor de Inglés 2');
        
        `
    );
  }

  existe = false;
  sqlComisiones =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'comisiones'";
  res = await db.get(sqlComisiones, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `
          CREATE TABLE comisiones (
            nroComision INT NOT NULL,
            fechaCreacion DATE NOT NULL,
            descripcion VARCHAR(50),
            PRIMARY KEY (nroComision)
            );
          `
    );
    console.log("tabla comisiones creada!");
    await db.run(
      `
        INSERT INTO comisiones (nroComision, fechaCreacion, descripcion)
        VALUES (551, '2005-02-02', 'Comisión A'),
        (234, '2009-01-23', 'Comisión K'),
        (125, '2010-01-21', 'Comisión J'),
        (281, '2018-03-23', 'Comisión Q'),
        (923, '2014-02-24', 'Comisión I'),
        (123, '2013-07-12', 'Comisión H'),
        (238, '2011-02-12', 'Comisión G'),
        (568, '2020-07-19', 'Comisión F'),
        (793, '2021-02-21', 'Comisión E'),
        (357, '2023-03-01', 'Comisión C');
        `
    );
  }

  existe = false;
  sqlMaterias =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'materias'";
  res = await db.get(sqlMaterias, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      
      `
            CREATE TABLE materias (
              nroMateria INT,
              legajoProfesor INT,
              legajoAlumno INT,
              nroComision INT,
              fechaCreacion date,
              descripcion VARCHAR(100),
              FOREIGN KEY(legajoAlumno) REFERENCES alumnos (legajoAlumno) ON DELETE SET NULL,
              FOREIGN KEY(nroComision) REFERENCES comisiones (nroComision) ON DELETE SET NULL,
              FOREIGN KEY(legajoProfesor) REFERENCES profesores (legajoProfesor) ON DELETE SET NULL,
              PRIMARY KEY(nroMateria)
              );
            `
    );
    console.log("tabla materias creada!");
    await db.run(
      `
          INSERT INTO materias (nroMateria, legajoProfesor, legajoAlumno, nroComision, fechaCreacion, descripcion)
          VALUES (24, 10231, 75094, 551, '2005-12-05', 'Algebra'),
          (20, 11235, 75231, 234, '2010-05-20', 'Desarrollo de Software'),
          (10, 12355, 79023, 125, '2009-05-10', 'Ciber Seguridad'),
          (15, 15246, 80203, 281, '2002-06-10', 'Física 1'),
          (29, 17235, 82345, 923, '2015-06-24', 'Física 2'),
          (46, 20241, 82460, 123, '2016-05-18', 'Química'),
          (50, 12345, 83231, 238, '2017-06-13', 'Análisis Numerico'),
          (12, 25234, 85314, 568, '2018-05-19', 'Diseño de Sistemas de Información'),
          (09, 28414, 89412, 793, '2019-05-11', 'Inglés 1'),
          (35, 30123, 90223, 357, '2013-06-10', 'Inglés 2');

          `
    );
  }

  existe = false;
  sqlExamenes =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'examenes'";
  res = await db.get(sqlExamenes, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `
            CREATE TABLE examenes (
              nroMateria INT,
              legajoAlumno INT,
              fechaExamen DATE,
              descripcion VARCHAR(100),
              FOREIGN KEY(nroMateria) REFERENCES materias (nroMateria) ON DELETE SET NULL,
              FOREIGN KEY(legajoAlumno) REFERENCES alumnos (legajoAlumno) ON DELETE SET NULL,
              PRIMARY KEY(nroMateria)
              );
            `
    );
    console.log("tabla examenes creada!");
    await db.run(
      `
           INSERT INTO examenes (nroMateria, legajoAlumno, fechaExamen, descripcion)
            VALUES (24, 75094, '2023-05-20', 'Examen de Algebra'),
            (20, 75231, '2023-06-13', 'Examen de Desarrollo de Software'),
            (10, 79023, '2023-10-25', 'Examen de Ciber Seguridad'),
            (15, 80203, '2023-07-31', 'Examen de Física 1'),
            (29, 82345, '2023-04-30', 'Examen de Física 2'),
            (46, 82460, '2023-10-12', 'Examen de Química'),
            (50, 83231, '2023-12-05', 'Examen de Análisis Numerico'),
            (12, 85314, '2023-05-23', 'Examen de Diseño de Sistemas de Información'),
            (9, 89412, '2023-06-15', 'Examen de Inglés 1'),
            (35, 90223, '2023-05-31', 'Examen de Inglés 2');
            
            `
    );
  }
  
  //Activa nuevamente las fk
  await db.run("PRAGMA foreign_keys = ON");
  db.close();
}

CrearBaseSiNoExiste();

module.exports = CrearBaseSiNoExiste;
