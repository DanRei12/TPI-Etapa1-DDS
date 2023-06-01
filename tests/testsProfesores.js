const request = require("supertest");
const app = require("../index");
const profesorAlta = {
  Nombre: "Nombre Profesor " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  Apellido: "Apellido Profesor " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  Descripcion: "Descripcion Profesor " + (( ) => (Math.random() + 1).toString(150).substring(2))(),  // Genera un nombre aleatorio
};
const profesorModificacion = {
    legajoProfesor: 1,
    Nombre: "Profesor " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
    Apellido: "Apellido Profesor " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
    Descripcion: "Descripcion Profesor " + (( ) => (Math.random() + 1).toString(150).substring(2))(),  // Genera un nombre aleatorio
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

// test route/articulos/:id GET
describe("GET /api/profesores/:id", () => {
  it("Deberia devolver el profesor con el id 1", async () => {
    const res = await request(app).get("/api/profesores/1");
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

// test route/articulos/:id PUT
describe("PUT /api/profesores/:id", () => {
  it("Deberia devolver el profesor con el id 1 modificado", async () => {
    const res = await request(app).put("/api/profesores/1").send(profesorModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

// test route/articulos/:id DELETE
describe("DELETE /api/profesores/:id", () => {
  it("Deberia devolver el profesor con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/profesor/1");
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
