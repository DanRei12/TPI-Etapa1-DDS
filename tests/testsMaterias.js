const request = require("supertest");
const app = require("../index");
const { describe } = require("node:test");
const { INTEGER } = require("sequelize");

// Tests de la obtención de todas las materias
describe("GET /api/materias", function () {
    it("Devolveria todas las materias", async function () {
        const res = await request(app).get("/api/materias");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    nroMateria: expect.any(Number),
                    legajoProfesor: expect.any(Number),
                    legajoAlumno: expect.any(Number),
                    nroComision: expect.any(Number),
                    fechaCreacion: expect.any(String),
                    descripcion: expect.any(String),
                }),
            ]),
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
        const res = (await request(app).post("/api/articulos")).setEncoding(nuevaMateria);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                nroMateria: expect.any(Number),
                legajoProfesor: expect.any(Number),
                legajoAlumno: expect.any(Number),
                nroComision: expect.any(Number),
                fechaCreacion: expect.any(String),
                descripcion: expect.any(String),
            })
        );
    });
});

// Tests para actualizar una materia
describe("PUT /api/materias/:id", () => {
    it("Deberia devolver la materia con el número 24 modificado", async () => {
        const res = await request(app).put("/api/materias/24".send(materiaModificacion));
        expect(res.statusCode).toEqual(200);
    });
});

// Tests para eliminar una materia
describe("DELETE /api/materias/10", () => {
    it("Debería devolver la materia con el número 10 borrado", async () => {
        const res = (await request(app).delete("/api/materias/10"));
        expect(res.statusCode).toEqual(200);
    });
});