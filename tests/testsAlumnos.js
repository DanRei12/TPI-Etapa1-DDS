const request = require("supertest");
const app = require("../index");
const alumnoAlta = {
  Nombre: "Nombre alumno " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  Apellido: "Apellido alumno " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  FechaInscripcion: new Date().toISOString(),
  Descripcion: "Descripcion alumno " + (( ) => (Math.random() + 1).toString(150).substring(2))(),  // Genera un nombre aleatorio
  
};
const alumnoModificacion = {
    legajoAlumno: 1,
    Nombre: "Nombre alumno " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
    Apellido: "Apellido alumno " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
    FechaInscripcion: new Date().toISOString(),
    Descripcion: "Descripcion alumno " + (( ) => (Math.random() + 1).toString(150).substring(2))(),  // Genera un nombre aleatorio
};


// test route/articulos GET
describe("GET /api/alumnos", () => {
  it("Deberia devolver todos los alumnos", async () => {
    const res = await request(app).get("/api/alumnos");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
            legajoAlumno: expect.any(Number),
            Nombre: expect.any(String),
            Apellido: expect.any(String),           
            FechaInscripcion: expect.any(String),
            Descripcion: expect.any(String),
        }),
      ])
    );
  });
});

// test route/articulos/:id GET
describe("GET /api/alumnos/:id", () => {
  it("Deberia devolver el alumno con el id 1", async () => {
    const res = await request(app).get("/api/alumnos/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        legajoAlumno: expect.any(Number),
        Nombre: expect.any(String),
        Apellido: expect.any(String),           
        FechaInscripcion: expect.any(String),
        Descripcion: expect.any(String),
      })
    );
  });
});

// test route/articulos POST
describe("POST /api/alumnos", () => {
  it("Deberia devolver el alumno que acabo de crear", async () => {
    const res = await request(app).post("/api/alumnos").send(alumnoAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        legajoAlumno: expect.any(Number),
        Nombre: expect.any(String),
        Apellido: expect.any(String),           
        FechaInscripcion: expect.any(String),
        Descripcion: expect.any(String),
      })
    );
  });
});

// test route/articulos/:id PUT
describe("PUT /api/alumnos/:id", () => {
  it("Deberia devolver el alumno con el id 1 modificado", async () => {
    const res = await request(app).put("/api/alumnos/1").send(alumnoModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

// test route/articulos/:id DELETE
describe("DELETE /api/alumnos/:id", () => {
  it("Deberia devolver el alumno con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/alumnos/1");
    expect(res.statusCode).toEqual(200);
    
    // baja logica, no se borra realmente
    // expect(res.body).toEqual(
    //   expect.objectContaining({
    //     IdArticulo: expect.any(Number),
    //     Nombre: expect.any(String),
    //     Precio: expect.any(Number),
    //   })
    // );

  });
});
