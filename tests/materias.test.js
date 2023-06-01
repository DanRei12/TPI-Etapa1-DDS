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
    it("Deberia devolver la materia que se acaba de crear", async () => {
        const res = await request(app).post("/api/materias/").send(nuevaMateria);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                nroMateria: expect.any(Number),
                legajoProfesor: expect.any(Number),
                legajoAlumno: expect.any(Number),
                nroComision: expect.any(Number),
                fechaCreacion: expect.any(DATE),
                descripcion: expect.any(String),
            })
        );
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
describe("DELETE /api/materias/10", () => {
    it("Debería devolver la materia con el número 24 borrado", async () => {
        const res = await request(app).delete("/api/materias/24");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({});
    });
});