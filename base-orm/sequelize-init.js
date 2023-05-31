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
            validate: {
                notNull: {
                  args: true,
                  msg: "El nombre del alumno es requerido",
                }
            },
          },
          apellido: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notNull: {
                  args: true,
                  msg: "El apellido del alumno es requerido",
                }
            },
        
          },
          fechaIncripcion: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: {
                  args: true,
                  msg: "La fecha de inscripcion del alumno es requerida",
                }
            },
            
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
            validate: {
                notNull: {
                  args: true,
                  msg: "El legajo del profesor es requerido",
                }
            },
          },
          nombre: {
            type: DataTypes.STRING(15),
            allowNull: false,
            validate: {
                notNull: {
                  args: true,
                  msg: "El nombre del profesor es requerido",
                }
            },
          },
          apellido: {
            type: DataTypes.STRING(15),
            allowNull: false,
            validate: {
                notNull: {
                  args: true,
                  msg: "El apellido del profesor es requerido",
                }
            },
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
            validate: {
                notNull: {
                  args: true,
                  msg: "El numero de comisión es requerido",
                }
            },
            
          },
          fechaCreacion: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: {
                  args: true,
                  msg: "La fecha de creacion de la comisión es requerida",
                }
            },
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
            validate: {
                notNull: {
                  args: true,
                  msg: "El numero de la materia es requerido",
                }
            },
          },
          legajoProfesor: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: Profesor,
              key: 'legajoProfesor',
            },
            validate: {
                notNull: {
                  args: true,
                  msg: "El legajo del profesor es requerido",
                }
            },
          },
          legajoAlumno: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: Alumno,
              key: 'legajoAlumno',
            },
            validate: {
                notNull: {
                  args: true,
                  msg: "El legajo del alumno es requerido",
                }
            },
          },
          nroComision: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: Comision,
              key: 'nroComision',
            },
            validate: {
                notNull: {
                  args: true,
                  msg: "El numero de comision es requerido",
                }
            },
          },
          fechaCreacion: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: {
                  args: true,
                  msg: "La fecha de creacion es requerida",
                }
            },
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
            validate: {
                notNull: {
                  args: true,
                  msg: "El numero de la materia es requerido",
                }
            },
          },
          legajoAlumno: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: Alumno,
              key: 'legajoAlumno',
            },
            validate: {
                notNull: {
                  args: true,
                  msg: "El legajo del alumno es requerido",
                }
            },
          },
          fechaExamen: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: {
                  args: true,
                  msg: "La fecha del examen es requerido",
                }
            },
          },
          descripcion: {
            type: DataTypes.STRING(100),
          },
          primaryKey: true,
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
  
