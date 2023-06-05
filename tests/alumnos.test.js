const request = require("supertest");
const app = require("../index");
const alumnoAlta = {
  LegajoAlumno: 79024,
  Nombre: "Ricardinho",  // Genera un nombre aleatorio
  Apellido: "Ronaldo",  // Genera un nombre aleatorio
  FechaInscripcion: "2021-07-31T15:00:00.000Z",
  Descripcion: "Estudiante sobresaliente",  // Genera un nombre aleatorio
  
};
const alumnoModificacion = {
    legajoAlumno: 79023,
    nombre: "Mari",  
    apellido: "Closs",  
    fechaInscripcion: new Date().toISOString(),
    descripcion: "un muy buen estudiante",
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
    expect(res.body.Alumnos).toBeInstanceOf(Array);

    // Verificar la estructura de cada examen en la respuesta
    res.body.Alumnos.forEach((alumno) => {
      expect(alumno).toHaveProperty("apellido");
      expect(alumno).toHaveProperty("descripcion");
      expect(alumno).toHaveProperty("fechaInscripcion");
      expect(alumno).toHaveProperty("legajoAlumno");
      expect(alumno).toHaveProperty("nombre");
    });
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
        nombre: expect.any(String),
        apellido: expect.any(String),           
        fechaInscripcion: expect.any(String),
        descripcion: expect.any(String),
      })
    );
  });
});

// test route/alumnos POST
describe("POST /api/alumnos", () => {
  it("Debería agregar un nuevo alumno", async () => {
    const nuevoAlumno = {
      legajoAlumno: 12346,
      nombre: "Juan",
      apellido: "Pérez",
      fechaInscripcion: new Date(2022, 1, 1),
      descripcion: "Estudiante destacado",
    };

    const res = await request(app)
      .post("/api/alumnos")
      .send(nuevoAlumno);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("legajoAlumno", nuevoAlumno.legajoAlumno);
    expect(res.body).toHaveProperty("nombre", nuevoAlumno.nombre);
    expect(res.body).toHaveProperty("apellido", nuevoAlumno.apellido);
    expect(res.body).toHaveProperty("fechaInscripcion", nuevoAlumno.fechaInscripcion.toISOString());
    expect(res.body).toHaveProperty("descripcion", nuevoAlumno.descripcion);
  });

  /* it("Debería devolver un error de validación si se omiten campos obligatorios", async () => {
    const alumnoSinCamposObligatorios = {};

    const res = await request(app)
      .post("/api/alumnos")
      .send(alumnoSinCamposObligatorios);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toContain("legajoAlumno");
    expect(res.body.message).toContain("nombre");
    expect(res.body.message).toContain("apellido");
    expect(res.body.message).toContain("fechaInscripcion");
    expect(res.body.message).toContain("descripcion");
  }); */
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
  it("Deberia devolver el alumno con el legajo 90223 borrado", async () => {
    const res = await request(app).delete("/api/alumnos/90223");
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
