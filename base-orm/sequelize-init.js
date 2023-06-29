// configurar ORM sequelize
const { Sequelize, DataTypes, ValidationError } = require("sequelize");
//const sequelize = new Sequelize("sqlite:" + process.env.base );
const sequelize = new Sequelize("sqlite:" + "./.data/BD-Tpi-DDS.db");

// definicion del modelo de datos
const alumnos = sequelize.define(
  "alumnos",
  {
    legajoAlumno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "El legajo del alumno es requerido",
        },
      },
    },
    nombre: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El nombre del alumno es requerido",
        },
      },
    },
    apellido: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El apellido del alumno es requerido",
        },
      },
    },
    
    //Se puede observar que la fecha entra como string y no date, esto permite visualización correcta en el front
    fechaInscripcion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "La fecha de inscripcion del alumno es requerida",
        },
      },
    },
    descripcion: {
      type: DataTypes.STRING(50),
    },
  },
  { timestamps: false },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (alumnos, options) {
        if (typeof alumnos.nombre === "string") {
          alumnos.nombre = alumnos.nombre.toUpperCase().trim();
        }
        if (typeof alumnos.apellido === "string") {
          alumnos.apellido = alumnos.apellido.toUpperCase().trim();
        }
        if (typeof alumnos.descripcion === "string") {
          alumnos.descripcion = alumnos.descripcion.toUpperCase().trim();
        }
      },
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
      validate: {
        notEmpty: {
          args: true,
          msg: "El legajo del profesor es requerido",
        },
      },
    },
    nombre: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El nombre del profesor es requerido",
        },
      },
    },
    apellido: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El apellido del profesor es requerido",
        },
      },
    },
    descripcion: {
      type: DataTypes.STRING(50),
    },
  },
  {
    timestamps: false,
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (profesores, options) {
        if (typeof profesores.nombre === "string") {
          profesores.nombre = profesores.nombre.toUpperCase().trim();
        }
        if (typeof profesores.apellido === "string") {
          profesores.apellido = profesores.apellido.toUpperCase().trim();
        }
        if (typeof profesores.descripcion === "string") {
          profesores.descripcion = profesores.descripcion.toUpperCase().trim();
        }
      },
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
      validate: {
        notEmpty: {
          args: true,
          msg: "El numero de comisión es requerido",
        },
      },
    },

    //Se puede observar que la fecha entra como string y no date, esto permite visualización correcta en el front
    fechaCreacion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "La fecha de creacion de la comisión es requerida",
        },
      },
    },
    descripcion: {
      type: DataTypes.STRING(50),
    },
  },
  { timestamps: false },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (comisiones, options) {
        if (typeof comisiones.descripcion === "string") {
          comisiones.descripcion = comisiones.descripcion.toUpperCase().trim();
        }
      },
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
      validate: {
        notEmpty: {
          args: true,
          msg: "El numero de la materia es requerido",
        },
      },
    },
    legajoProfesor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: profesores,
        key: "legajoProfesor",
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "El legajo del profesor es requerido",
        },
      },
    },
    legajoAlumno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: alumnos,
        key: "legajoAlumno",
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "El legajo del alumno es requerido",
        },
      },
    },
    nroComision: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: comisiones,
        key: "nroComision",
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "El numero de comision es requerido",
        },
      },
    },

    //Se puede observar que la fecha entra como string y no date, esto permite visualización correcta en el front
    fechaCreacion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "La fecha de creacion es requerida",
        },
      },
    },
    descripcion: {
      type: DataTypes.STRING(100),
    },
  },
  {
    timestamps: false,
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (materias, options) {
        if (typeof materias.descripcion === "string") {
          materias.descripcion = materias.descripcion.toUpperCase().trim();
        }
      },
    },
  }
);

const examenes = sequelize.define(
  "examenes",
  {
    nroMateria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: materias,
        key: "nroMateria",
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "El numero de la materia es requerido",
        },
      },
    },
    legajoAlumno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: alumnos,
        key: "legajoAlumno",
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "El legajo del alumno es requerido",
        },
      },
    },

    //Se puede observar que la fecha entra como string y no date, esto permite visualización correcta en el front
    fechaExamen: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "La fecha del examen es requerido",
        },
      },
    },
    descripcion: {
      type: DataTypes.STRING(100),
    },
  },
  {
    timestamps: false,
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (examenes, options) {
        if (typeof examenes.descripcion === "string") {
          examenes.descripcion = examenes.descripcion.toUpperCase().trim();
        }
      },
    },
  }
);

module.exports = {
  sequelize,
  alumnos,
  profesores,
  comisiones,
  materias,
  examenes,
};
