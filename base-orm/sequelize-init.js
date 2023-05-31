// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");
//const sequelize = new Sequelize("sqlite:" + process.env.base );
const sequelize = new Sequelize("sqlite:" + "./.data/BD-Tpi-DDS.db");

// definicion del modelo de datos
const alumnos = sequelize.define(
    "alumnos",
    {
        legajoAlumno: {
            type: DataTypes.INTEGER,
            primaryKey: true,
          },
          nombre: {
            type: DataTypes.STRING(10),
            allowNull: false,
          },
          apellido: {
            type: DataTypes.STRING(10),
            allowNull: false,
          },
          fechaIncripcion: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          descripcion: {
            type: DataTypes.STRING(50),
          },

    }
);

const profesores = sequelize.define(
    "profesores",
    {
        legajoProfesor: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
          },
          nombre: {
            type: DataTypes.STRING(15),
            allowNull: false,
          },
          apellido: {
            type: DataTypes.STRING(15),
            allowNull: false,
          },
          descripcion: {
            type: DataTypes.STRING(50),
          },

    }
);

const comisiones = sequelize.define(
    "comisiones",
    {
        nroComision: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
          },
          fechaCreacion: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          descripcion: {
            type: DataTypes.STRING(50),
          },
    }
);

const materias = sequelize.define(
    "materias",
    {
        nroMateria: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
          },
          legajoProfesor: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: Profesor,
              key: 'legajoProfesor',
            },
          },
          legajoAlumno: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: Alumno,
              key: 'legajoAlumno',
            },
          },
          nroComision: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: Comision,
              key: 'nroComision',
            },
          },
          fechaCreacion: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          descripcion: {
            type: DataTypes.STRING(100),
          },
    }
);

const examenes = sequelize.define(
    "examenes",
    {
        nroMateria: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: Materia,
              key: 'nroMateria',
            },
          },
          legajoAlumno: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: Alumno,
              key: 'legajoAlumno',
            },
          },
          fechaExamen: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          descripcion: {
            type: DataTypes.STRING(100),
          },
          primaryKey: true,
    }
)








module.exports = {
    sequelize,
    alumnos,
    profesores,
    comisiones,
    materias,
    examenes,
  };
  
