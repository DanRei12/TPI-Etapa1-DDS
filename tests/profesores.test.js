const request = require("supertest");
const app = require("../index");
const aprofesorAlta = {
  legajoProfesor: 20242,
  nombre: "Nombre profesor " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  apellido: "Apellido profesor " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  descripcion: "Descripcion profesor " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  
};
const profesorModificacion = {
    legajoProfesor: 20241,
    nombre: "Nombre profesor " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
    apellido: "Apellido profsesor " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
    descripcion: "Descripcion profesor " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
};


// test route/profesores GET
describe("GET /api/profesores", () => {
  it("Deberia devolver todos los profesores", async () => {
    const res = await request(app).get("/api/profesores");
    expect(res.statusCode).toEqual(200);
    expect(res.body.Profesores).toBeInstanceOf(Array);

    // Verificar la estructura de cada examen en la respuesta
    res.body.Profesores.forEach((profe) => {
      expect(profe).toHaveProperty("legajoProfesor");
      expect(profe).toHaveProperty("nombre");
      expect(profe).toHaveProperty("apellido");
      expect(profe).toHaveProperty("descripcion");
    });
  });
});

// test route/profesores/:id GET
describe("GET /api/profesores/:legajoProfesor", () => {
  it("Deberia devolver el profesores con el id 20241", async () => {
    const res = await request(app).get("/api/profesores/20241");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        legajoProfesor: expect.any(Number),
        nombre: expect.any(String),
        apellido: expect.any(String),           
        descripcion: expect.any(String),
      })
    );
  });
});

// test route/profesores POST
describe("POST /api/profesores", () => {
  it("Deberia devolver el profesor que acabo de crear", async () => {
    const res = await request(app)
      .post("/api/profesores")
      .send(aprofesorAlta);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("legajoProfesor", aprofesorAlta.legajoProfesor);
    expect(res.body).toHaveProperty("nombre", aprofesorAlta.nombre);
    expect(res.body).toHaveProperty("apellido", aprofesorAlta.apellido);
    expect(res.body).toHaveProperty("descripcion", aprofesorAlta.descripcion);
  });
  });


// test route/profesores/:id PUT
describe("PUT /api/profesores/:legajoProfesor", () => {
  it("Deberia devolver el profesor con el legajo 20241 modificado", async () => {
    const res = await request(app).put("/api/profesores/20241").send(profesorModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

// test route/profesores/:id DELETE
describe("DELETE /api/profesores/:legajoProfesor", () => {
  it("Deberia devolver el profesor con el legajo 30123 borrado", async () => {
    const res = await request(app).delete("/api/profesores/30123");
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
