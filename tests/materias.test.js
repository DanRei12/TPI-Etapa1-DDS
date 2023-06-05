const request = require("supertest");
const app = require("../index");

const nuevaMateria = {
    NumeroMateria: 200,
    LegProfesor: 11235,
    LegAlumno: 79023,
    NumeroComision: 234,
    FechaCreacion: new Date().toISOString(),
    Descripcion: "Matematica",
};

const materiaModificacion = {
    nroMateria: 24,
    legajoProfesor: 10231,
    legajoAlumno: 75094,
    nroComision: 551,
    fechaCreacion: '12-05-2005 09:00:00',
    descripcion: "Matematica",
}

// Tests de la obtención de todas las materias
describe("GET /api/materias", function () {
    it("Debería devolver todas las materias", async function () {
        const res = await request(app).get("/api/materias");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                rows: expect.arrayContaining([
                    expect.objectContaining({
                        nroMateria: expect.any(Number),
                        legajoProfesor: expect.any(Number),
                        legajoAlumno: expect.any(Number),
                        nroComision: expect.any(Number),
                        fechaCreacion: expect.any(String),
                        descripcion: expect.any(String),
                    }),
                ]),
                count: expect.any(Number) 
            })
        );
    });
});

// Tests de la obtención de una materia en particular
describe("GET /api/materias/:id", function () {
    it("Debería devolver la materia con el id 24", async function () {
        const res = await request(app).get("/api/materias/24");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                nroMateria: 24,
                legajoProfesor: expect.any(Number),
                legajoAlumno: expect.any(Number),
                nroComision: expect.any(Number),
                fechaCreacion: expect.any(String),
                descripcion: expect.any(String),
            })
        );
    });
});
 
// Tests para agregar una materia
describe("POST /api/materias", () => {
    it("Debería agregar una nueva materia", async () => {
      const alumno = {
        legajoAlumno: 81211,
        nombre: "Kylian",
        apellido: "Mbappé",
        fechaInscripcion: "2021-04-30T14:00:00.000Z",
        descripcion: "Alumno jugador",
      };
      const materia = {
        nroMateria: 201,
        legajoProfesor: 13335,
        legajoAlumno: 81211,
        nroComision: 239,
        fechaCreacion: "2009-11-11T15:00:00.000Z",
        descripcion: "Hidrologia",
      };
      const profesor = {
        legajoProfesor: 13335,
        nombre: "Silvio",
        apellido: "Serra",
        descripcion: "Mejor profe de la universidad",
      };
      const comision = {
        nroComision: 239,
        fechaCreacion: "2002-07-31T14:00:00.000Z",
        descripcion: "Comision Z",
      };
  
      const res1 = await request(app).post("/api/comisiones").send(comision);
  
      const res2 = await request(app).post("/api/alumnos").send(alumno);
  
      const res3 = await request(app).post("/api/profesores").send(profesor);
  
      const res = await request(app).post("/api/materias").send(materia);
    
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(expect.objectContaining(materia));
    });
});

// Tests para actualizar una materia
describe("PUT /api/materias/:id", () => {
    it("Deberia devolver la materia con el número 24 modificado", async () => {
        const res = await request(app).put("/api/materias/24").send(materiaModificacion);
        expect(res.statusCode).toEqual(200);
    });
});

// Tests para eliminar una materia
describe("DELETE /api/materias/9", () => {
    it("Debería devolver la materia con el número 9 borrado", async () => {
        const res = await request(app).delete("/api/materias/9");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({});
    });
});