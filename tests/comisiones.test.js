const request = require('supertest');
const app = require("../index");

const comisionPUT = {
    nroComision: 1905,
    fechaCreacion: '2022-05-20 10:03:00',
    descripcion: 'Comisión modificada',
};

describe("GET /api/comisiones", () => {
    it("debería devolver todos los comisiones", async () => {
        const res = await request(app).get("/api/comisiones");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);

        // Verificar la estructura de cada comision en la respuesta
        res.body.forEach((comision) => {
            expect(comision).toHaveProperty('nroComision');
            expect(comision).toHaveProperty('fechaCreacion');
            expect(comision).toHaveProperty('descripcion');
        });
    });
});

describe("GET /api/comisiones/:id", () => {
    it("debería devolver el comision con nroComision 125", async () => {
        const res = await request(app).get("/api/comisiones/125");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                nroComision: expect.any(Number),
                fechaCreacion: expect.any(String),
                descripcion: expect.any(String),
            })
        );
    });
});

describe("POST /api/comisiones", () => {
    it("Debería agregar un nuevo comision", async () => {
        const comision = {
            nroComision: 111,
            fechaCreacion: new Date().toISOString(),
            descripcion: 'Comision agregada',
        };

        const res = await request(app).post("/api/comisiones").send(comision);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(expect.objectContaining(comision));
    });

    it("Debería devolver un error de validación si falta un campo requerido", async () => {
        const comision = {
            nroComision: 1010,
            descripcion: 'Comision agregada',
        };

        const res = await request(app).post("/api/comisiones").send(comision);

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty("message");
    });
});


describe("PUT /api/comisiones/:id", () => {
    it("debería devolver el comision con el nroComision 10 modificado", async () => {
        const res = await request(app).put("/api/comisiones/10").send(comisionPUT);
        expect(res.statusCode).toEqual(200);
    });
});

describe("DELETE /api/comisiones/:id", () => {
    it("debería devolver la comision con el nroComision 125 borrado", async () => {
        const res = await request(app).delete("/api/comisiones/125");
        expect(res.statusCode).toEqual(200);
    });
});
