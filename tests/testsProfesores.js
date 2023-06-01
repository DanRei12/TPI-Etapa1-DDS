const request = require("supertest");
const app = require("../index");
const aprofesorAlta = {
  legajoProfesor: 20242,
  Nombre: "Nombre profesor " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  Apellido: "Apellido profesor " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  FechaInscripcion: new Date().toISOString(),
  Descripcion: "Descripcion profesor " + (( ) => (Math.random() + 1).toString(150).substring(2))(),  // Genera un nombre aleatorio
  
};
const profesorModificacion = {
    legajoProfesor: 20241,
    Nombre: "Nombre profesor " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
    Apellido: "Apellido profsesor " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
    FechaInscripcion: new Date().toISOString(),
    Descripcion: "Descripcion profesor " + (( ) => (Math.random() + 1).toString(150).substring(2))(),  // Genera un nombre aleatorio
};


// test route/profesores GET
describe("GET /api/profesores", () => {
  it("Deberia devolver todos los profesores", async () => {
    const res = await request(app).get("/api/profesores");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
            legajoProfesor: expect.any(Number),
            Nombre: expect.any(String),
            Apellido: expect.any(String),           
            Descripcion: expect.any(String),
        }),
      ])
    );
  });
});

// test route/profesores/:id GET
describe("GET /api/profesores/:id", () => {
  it("Deberia devolver el profesores con el id 20241", async () => {
    const res = await request(app).get("/api/profesores/:20241");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        legajoProfesor: expect.any(Number),
        Nombre: expect.any(String),
        Apellido: expect.any(String),           
        Descripcion: expect.any(String),
      })
    );
  });
});

// test route/profesores POST
describe("POST /api/profesores", () => {
  it("Deberia devolver el profesor que acabo de crear", async () => {
    const res = await request(app).post("/api/profesores").send(profesorAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        legajoProfesor: expect.any(Number),
        Nombre: expect.any(String),
        Apellido: expect.any(String),           
        Descripcion: expect.any(String),
      })
    );
  });
});

// test route/profesores/:id PUT
describe("PUT /api/profesores/:id", () => {
  it("Deberia devolver el profesor con el legajo 20241 modificado", async () => {
    const res = await request(app).put("/api/profesores/20241").send(profesorModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

// test route/profesores/:id DELETE
describe("DELETE /api/profesores/:id", () => {
  it("Deberia devolver el profesor con el legajo 20241 borrado", async () => {
    const res = await request(app).delete("/api/profesores/20241");
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
