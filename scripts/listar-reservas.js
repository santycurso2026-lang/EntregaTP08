const {
conectarBaseDatos,
desconectarBaseDatos,
} = require("../src/config/base-datos");
const { Reserva } = require("../src/modelos/reservas");
async function main() {
try {
await conectarBaseDatos();
const listadoReservas = await Reserva.find({});
console.table(
listadoReservas.map((reserva) => ({
id: reserva._id.toString(),
estudiante: reserva.estudiante,
email: reserva.email,
sala: reserva.sala,
fecha: reserva.fecha,
turno: reserva.turno,
personas: reserva.personas,
})),
);
console.log("Total de reservas:", listadoReservas.length);
} finally {
    await desconectarBaseDatos();
  }
} 

main().catch((error) => {
  console.error("No se pudo consultar las reservas:", error.name);
  if (error.errors) {
    console.error("Campos a revisar:", Object.keys(error.errors).join(", "));
  }
  console.error("Revisar configuración y disponibilidad de MongoDB.");
  process.exitCode = 1;
});