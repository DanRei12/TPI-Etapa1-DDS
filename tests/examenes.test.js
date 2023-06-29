const request = require("supertest");
const app = require("../index");

const examenModificacion = {
  nroMateria: 15,
  legajoAlumno: 80203,
  fechaExamen: new Date().toISOString(),
  descripcion: "Examen de PAV",
};

describe("GET /api/examenes", () => {
  it("Deberia devolver todos los examenes", async () => {
    const res = await request(app).get("/api/examenes");
    expect(res.statusCode).toEqual(200);
    expect(res.body.Items).toBeInstanceOf(Array);

    // Verificar la estructura de cada examen en la respuesta
    res.body.Items.forEach((examen) => {
      expect(examen).toHaveProperty("nroMateria");
      expect(examen).toHaveProperty("legajoAlumno");
      expect(examen).toHaveProperty("fechaExamen");
      expect(examen).toHaveProperty("descripcion");
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

describe("POST /api/examenes", () => {
  it("Debería agregar un nuevo examen", async () => {
    const examen = {
      nroMateria: 200,
      legajoAlumno: 84211,
      fechaExamen: new Date().toISOString(),
      descripcion: "Examen de Algebra",
    };
    const alumno = {
      legajoAlumno: 84211,
      nombre: "Jeiner",
      apellido: "Sanchez",
      fechaInscripcion: new Date().toISOString(),
      descripcion: "Buen estudiante",
    };
    const materia = {
      nroMateria: 200,
      legajoProfesor: 11235,
      legajoAlumno: 84211,
      nroComision: 234,
      fechaCreacion: new Date().toISOString(),
      descripcion: "Hidrologia",
    };
    const profesor = {
      legajoProfesor: 11235,
      nombre: "Ricardo",
      apellido: "Rabozzi",
      descripcion: "Buen profe",
    };
    const comision = {
      nroComision: 234,
      fechaCreacion: new Date().toISOString(),
      descripcion: "Comision U",
    };

    const res1 = await request(app).post("/api/comisiones").send(comision);

    const res2 = await request(app).post("/api/alumnos").send(alumno);

    const res3 = await request(app).post("/api/profesores").send(profesor);

    const res4 = await request(app).post("/api/materias").send(materia);

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
    const res = await request(app)
      .put("/api/examenes/10")
      .send(examenModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

describe("DELETE /api/examenes/:id", () => {
  it("Deberia devolver el examen con el nroMateria 12 borrado", async () => {
    const res = await request(app).delete("/api/examenes/12");
    expect(res.statusCode).toEqual(200);
  });
});
