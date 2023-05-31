// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");
//const sequelize = new Sequelize("sqlite:" + process.env.base );
const sequelize = new Sequelize("sqlite:" + "./.data/BD-Tpi-DDS.db");

// definicion del modelo de datos
const alumnos = sequelize.define()

const profesores = sequelize.define()

const comisiones = sequelize.define()

const materias = sequelize.define()

const examenes = sequelize.define()








module.exports = {
    sequelize,
    alumnos,
    profesores,
    comisiones,
    materias,
    examenes
  };
  
