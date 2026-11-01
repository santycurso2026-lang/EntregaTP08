const mongoose = require("mongoose");
const { Reserva } = require("../modelos/reservas");

function representarReserva(documento) {
  return {
    id: documento._id.toString(),
    estudiante: documento.estudiante,
    email: documento.email,
    sala: documento.sala,
    fecha: documento.fecha,
    turno: documento.turno,
    personas: documento.personas,
    estado: documento.estado || "pendiente", // <--- Si no existe, por defecto toma "pendiente"
  };
}
function crearServicioReservasMongo() {
  async function listar(salaFiltro) {
    const filtro = {};
    if (salaFiltro !== undefined) {
      if (typeof salaFiltro !== "string" || !salaFiltro.trim()) {
        const error = new Error("Sala de filtro inválida");
        error.codigo = "FILTRO_INVALIDO";
        throw error;
      }
      filtro.sala = salaFiltro.trim();
    }
    const documentos = await Reserva.find(filtro).lean();
    return documentos.map(representarReserva);
  }

  async function obtenerPorId(id) {
    if (!mongoose.isObjectIdOrHexString(id)) {
      const error = new Error("Identificador inválido");
      error.codigo = "ID_INVALIDO";
      throw error;
    }
    const documento = await Reserva.findById(id).lean();
    return documento ? representarReserva(documento) : null;
  }

  async function crear(datos) {
    const documento = await Reserva.create({
      estudiante: datos.estudiante,
      email: datos.email,
      sala: datos.sala,
      fecha: datos.fecha,
      turno: datos.turno,
      personas: datos.personas,
      // El estado toma el default "pendiente" definido en el modelo de Mongoose
    });
    return representarReserva(documento);
  }

  return { listar, obtenerPorId, crear };
}

module.exports = { crearServicioReservasMongo };