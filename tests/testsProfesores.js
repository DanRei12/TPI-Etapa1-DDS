const request = require("supertest");
const app = require("../index");
const aprofesorAlta = {
  Nombre: "Nombre profesor " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  Apellido: "Apellido profesor " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  FechaInscripcion: new Date().toISOString(),
  Descripcion: "Descripcion profesor " + (( ) => (Math.random() + 1).toString(150).substring(2))(),  // Genera un nombre aleatorio
  
};
const profesorModificacion = {
    legajoProfesor: 1,
    Nombre: "Nombre profesor " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
    Apellido: "Apellido profsesor " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
    FechaInscripcion: new Date().toISOString(),
    Descripcion: "Descripcion profesor " + (( ) => (Math.random() + 1).toString(150).substring(2))(),  // Genera un nombre aleatorio
};


// test route/articulos GET
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

describe("GET /api/profesores/:id", () => {
  it("Deberia devolver el profesores con el id 1", async () => {
    const res = await request(app).get("/api/ptofesores/1");
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

// test route/articulos POST
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


describe("PUT /api/profesor/:id", () => {
  it("Deberia devolver el profesor con el id 1 modificado", async () => {
    const res = await request(app).put("/api/profesores/1").send(profesorModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

// test route/articulos/:id DELETE
describe("DELETE /api/alumnos/:id", () => {
  it("Deberia devolver el profesor con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/profesores/1");
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
