const request = require("supertest");
const app = require("../index");

const examenModificacion = {
    nroMateria: 10,
    legajoAlumno: 89783,
    fechaExamen: '2022-05-20 10:03:00',
    descripcion: "Final de Qatar"
};

describe("GET /api/examenes", () => {
    it("Deberia devolver todos los examenes", async () => {
      const res = await request(app).get("/api/examenes");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);

    // Verificar la estructura de cada examen en la respuesta
    res.body.forEach((examen) => {
      expect(examen).toHaveProperty('nroMateria');
      expect(examen).toHaveProperty('legajoAlumno');
      expect(examen).toHaveProperty('fechaExamen');
      expect(examen).toHaveProperty('descripcion');
    });
  });
});

describe("GET /api/examenes/:id", () => {
    it("Deberia devolver el examen con nroMateria 29", async () => {
      const res = await request(app).get("/api/examenes/29");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
            nroMateria: expect.any(Number),
            legajoAlumno: expect.any(Number),
            fechaExamen: expect.any(String),
            descripcion: expect.any(String),
        })
      );
    });
});

//Desde aca no funca pa 
describe("POST /api/examenes", () => {
  it("Debería agregar un nuevo examen", async () => {
    const examen = {
      nroMateria: 24,
      legajoAlumno: 75094,
      fechaExamen: new Date().toISOString(),
      descripcion: "Examen de Algebra",
    };

    const res = await request(app).post("/api/examenes").send(examen);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining(examen));
  });

  it("Debería devolver un error de validación si falta un campo requerido", async () => {
    const examen = {
      nroMateria: 24,
      legajoAlumno: 75094,
      descripcion: "Examen de Algebra",
    };

    const res = await request(app).post("/api/examenes").send(examen);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message");
  });
});


describe("PUT /api/examenes/:id", () => {
    it("Deberia devolver el examen con el nroMateria 10 modificado", async () => {
      const res = await request(app).put("/api/examenes/10").send(examenModificacion);
      expect(res.statusCode).toEqual(200);
    });
});

describe("DELETE /api/examenes/:id", () => {
    it("Deberia devolver el examen con el nroMateria 12 borrado", async () => {
      const res = await request(app).delete("/api/examenes/12");
      expect(res.statusCode).toEqual(200);
    });
});
