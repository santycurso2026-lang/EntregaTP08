const {
conectarBaseDatos,
desconectarBaseDatos,
} = require("../src/config/base-datos");
const { Reserva } = require("../src/modelos/reservas");
async function main() {
try {
await conectarBaseDatos();
const reservaCreada = await Reserva.create({
estudiante: "Juan Sosa",
email: "juan.sosa@example.com",
sala: "Sala Norte",
fecha: "2023-10-15",
turno: "Tarde",
personas: 1
});
console.log("Reserva guardada. _id:", reservaCreada._id.toString());
} finally {
await desconectarBaseDatos();
}
}
main().catch((error) => {
console.error("No se pudo crear la reserva:", error.name);
if (error.errors) {
console.error("Campos a revisar:", Object.keys(error.errors).join(", "));
}
console.error("Revisar datos, configuración y disponibilidad de MongoDB.");
process.exitCode = 1;
});