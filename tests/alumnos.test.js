const request = require("supertest");
const app = require("../index");
const alumnoAlta = {
  legajoAlumno: 79024,
  Nombre: "Nombre alumno " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  Apellido: "Apellido alumno " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  FechaInscripcion: new Date().toISOString(),
  Descripcion: "Descripcion alumno " + (( ) => (Math.random() + 1).toString(150).substring(2))(),  // Genera un nombre aleatorio
  
};
const alumnoModificacion = {
    legajoAlumno: 79023,
    Nombre: "Nombre alumno " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
    Apellido: "Apellido alumno " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
    FechaInscripcion: new Date().toISOString(),
    Descripcion: generateRandomString(150),
};

function generateRandomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


// test route/alumnos GET
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

// test route/alumnos/:id GET
describe("GET /api/alumnos/:legajoAlumno", () => {
  it("Deberia devolver el alumno con el legajo 79023", async () => {
    const res = await request(app).get("/api/alumnos/79023");
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

// test route/alumnos POST
describe("POST /api/alumnos", () => {
  it("Deberia devolver el alumno que acabo de crear", async () => {
    const res = await request(app).post("/api/alumnos").send(alumnoAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        legajoAlumno: expect.any(Number),
        Nombre: expect.any(String),
        Apellido: expect.any(String),           
        fechaInscripcion: expect.any(String),
        Descripcion: expect.any(String),
      })
    );
  });
});

// test route/alumnos/:id PUT
describe("PUT /api/alumnos/:legajoAlumno", () => {
  it("Deberia devolver el alumno con el legajo 79023 modificado", async () => {
    const res = await request(app).put("/api/alumnos/79023").send(alumnoModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

// test route/alumnos/:id DELETE
describe("DELETE /api/alumnos/:legajoAlumno", () => {
  it("Deberia devolver el alumno con el legajo 79023 borrado", async () => {
    const res = await request(app).delete("/api/alumnos/79023");
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
