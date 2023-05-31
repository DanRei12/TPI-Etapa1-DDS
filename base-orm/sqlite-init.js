// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/BD-Tpi-DDS.db");
  
  

  let existe = false;
  let res = null;

  
  sqlAlumnos= "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'alumnos'",
  res = await db.get(sqlAlumnos, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE TABLE alumnos ( legajoAlumno INT, nombre	VARCHAR(10) NOT NULL, apellido VARCHAR(10) NOT NULL, fechaIncripcion DATETIME NOT NULL, descripcion VARCHAR(50), PRIMARY KEY(legajoAlumno));"
    );
    console.log("tabla alumnos creada!");
    await db.run(
      `INSERT INTO alumnos (legajoAlumno, nombre, apellido, fechaIncripcion, descripcion)
      VALUES (83231, 'Juan', 'Ramonda', '10-12-2019 09:15:00', 'Estudiante destacado'),
        (82345, 'Federica', 'López', '20-11-2019 09:15:00', 'Estudiante destacado'),
        (80203, 'Carlos', 'Rodríguez', '15-11-2018 09:15:00', ''Estudiante promedio'),
        (79023, 'Ana', 'Zabala', '20-11-2018 09:15:00', 'Estudiante destacado'),
        (85314, 'Laura', 'Torres', '27-11-2020 09:15:00', 'Estudiante promedio'),
        (90223, 'Diego', 'Damiani', '30-11-2021 09:15:00', 'Estudiante promedio'),
        (75231, 'Sofía', 'Palacios', '28-11-2017 09:15:00', 'Estudiante destacado'),
        (75094, 'javier', 'Valdez', '01-12-2017 09:15:00', 'Estudiante destacado'),
        (91456, 'Valeria', 'Molinas', '05-11-2021 09:15:00', 'Estudiante promedio'),
        (89412, 'Joaquín', 'Pelosi', '19-11-2020 09:15:00', 'Estudiante destacado');    
      `
      
    );
  }

  existe = false;
  sqlProfesores = "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'profesores'";
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
      sqlComisiones = "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'comisiones'";
      res = await db.get(sqlComisiones, []);
      if (res.contar > 0) existe = true;
      if (!existe) {
        await db.run(
          `
          CREATE TABLE comisiones (
            nroComision INT NOT NULL,
            fechaCreacion DATETIME NOT NULL,
            descripcion VARCHAR(50),
            PRIMARY KEY (nroComision)
            );
          `
    );
      console.log("tabla comisiones creada!");
      await db.run(
        `
        INSERT INTO comisiones (nroComision, fechaCreacion, descripcion)
        VALUES (551, '02-02-2005 09:00:00', 'Comisión A'),
        (234, '23-01-2009 10:25:00', 'Comisión K'),
        (125, '21-01-2010 13:15:00', 'Comisión J'),
        (281, '23-03-2018 20:21:00', 'Comisión Q'),
        (923, '24-02-2014 15:55:00', 'Comisión I'),
        (123, '12-07-2013 19:23:00', 'Comisión H'),
        (238, '12-02-2011 12:56:00', 'Comisión G'),
        (568, '19-07-2020 11:30:00', 'Comisión F'),
        (793, '21-02-2021 17:70:00', 'Comisión E'),
        (357, '01-03-2023 16:50:00', 'Comisión C');
        ` 
        
        );
  }
        
        
        
        existe = false;
        sqlMaterias = "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'materias'";
        res = await db.get(sqlMaterias, []);
        if (res.contar > 0) existe = true;
        if (!existe) {
          await db.run(
            `
            CREATE TABLE materias (
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
        console.log("tabla materias creada!");
        await db.run(
          `
          INSERT INTO materias (nroMateria, legajoProfesor, legajoAlumno, nroComision, fechaCreacion, descripcion)
          VALUES (24, 10231, 75094, 551, '12-05-2005 09:00:00', 'Algebra'),
          (20, 11235, 75231, 234, '20-05-2010 19:00:00', 'Desarrollo de Software'),
          (10, 12355, 79023, 125, '10-05-2009 09:34:00', 'Ciber Seguridad'),
          (15, 15246, 80203, 281, '10-06-2002 10:23:00', 'Física 1'),
          (29, 17235, 82345, 923, '24-06-2015 11:12:00', 'Física 2'),
          (46, 20241, 82460, 123, '18-05-2016 15:45:00', 'Química'),
          (50, 12345, 83231, 238, '13-06-2017 14:51:00', 'Análisis Numerico'),
          (12, 25234, 85314, 568, '19-05-2018 13:32:00', 'Diseño de Sistemas de Información'),
          (09, 28414, 89412, 793, '11-05-2019 20:33:00', 'Inglés 1'),
          (35, 30123, 90223, 357, '10-06-2013 17:42:00', 'Inglés 2');

          `
          );
  }
          
          
        existe = false;
        sqlExamenes = "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'examenes'";
        res = await db.get(sqlExamenes, []);
        if (res.contar > 0) existe = true;
        if (!existe) {
          await db.run(
            `
            CREATE TABLE examenes (
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
          console.log("tabla examenes creada!");
          await db.run(
            `
            INSERT INTO examenes (nroMateria, legajoAlumno, fechaExamen, descripcion)
            VALUES (24, 75094, '20-05-2023 10:00:00', 'Examen de Algebra'),
            (20, 75231, '13-06-2023 17:45:00', 'Examen de Desarrollo de Software'),
            (10, 79023, '25-10-2023 09:30:00', 'Examen de Ciber Seguridad'),
            (15, 80203, '31-07-2023 14:00:00', 'Examen de Física 1'),
            (29, 82345, '31-04-2023 17:40:00', 'Examen de Física 2'),
            (46, 82460, '12-10-2023 20:30:00', 'Examen de Química'),
            (50, 83231, '05-12-2023 16:30:00', 'Examen de Análisis Numerico'),
            (12, 85314, '23-05-2023 17:30:00', 'Examen de Diseño de Sistemas de Información'),
            (9, 89412, '15-06-2023 09:00:00', 'Examen de Inglés 1'),
            (35, 90223, '31-05-2023 11:00:00', 'Examen de Inglés 2');
            
            `
            );
    }
    
  db.close();

}


CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;

