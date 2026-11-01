function prepararAreaReservas(req, res, next) {
  res.locals.seccion = "Gestión de Reservas";
  next();
}

function validarReserva(req, res, next) {
  const valores = req.body ?? {};

  const estudiante =
    typeof valores.estudiante === "string" ? valores.estudiante.trim() : "";
  const email = typeof valores.email === "string" ? valores.email.trim() : "";
  const sala = typeof valores.sala === "string" ? valores.sala.trim() : "";
  const fecha = typeof valores.fecha === "string" ? valores.fecha.trim() : "";
  const turno = typeof valores.turno === "string" ? valores.turno.trim() : "";

  // Validación y conversión del número de personas
  const personasRecibido = valores.personas;
  const tipoPersonasValido =
    typeof personasRecibido === "number" ||
    (typeof personasRecibido === "string" && personasRecibido.trim() !== "");
  const personas = tipoPersonasValido ? Number(personasRecibido) : NaN;
  
  // Opciones permitidas por tus enums del Schema
  const salasValidas = ["Sala Norte", "Sala Sur", "Sala Multimedia"];
  const turnosValidos = ["Mañana", "Tarde", "Noche"];

  if (
    !estudiante ||
    !email ||
    !/@/.test(email) ||
    !salasValidas.includes(sala) ||
    !fecha ||
    !turnosValidos.includes(turno) ||
    !Number.isFinite(personas) ||
    !Number.isInteger(personas) ||
    personas < 1 ||
    personas > 6
  ) {
    if (req.baseUrl === "/api/reservas") {
      return res.status(400).json({
        error:
          "Completá todos los campos correctamente (revisá el email, que la sala y el turno sean válidos, y personas de 1 a 6).",
      });
    }
    return res.status(400).render("reservas/nuevo", {
      titulo: "Nueva reserva",
      error:
        "Completá todos los campos correctamente (revisá el email, que la sala y el turno sean válidos, y personas de 1 a 6).",
      valores,
    });
  }

  req.reservaValidada = { 
    estudiante,
    email,
    sala,
    fecha,
    turno,
    personas,
    
  };


  next();
}

module.exports = { prepararAreaReservas, validarReserva };
