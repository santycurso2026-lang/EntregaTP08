const { Reserva } = require("../src/modelos/reservas");

async function main() {
  const nuevaReserva = new Reserva({
    estudiante:"Juan Pérez",
    email: "juan.perez@example.com",
    sala: "Sala Norte",
    fecha: "2023-10-15",
    turno: "Mañana",
    personas: 1
  });
  
  await nuevaReserva.validate();
  console.log("Datos válidos; todavía no guardamos en MongoDB.");
}

main().catch((error) => {
  console.error("Validación rechazada:", error.name);
  if (error.errors) {
    console.error("Campos a revisar:", Object.keys(error.errors).join(", "));
  }
  process.exitCode = 1;
});