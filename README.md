# Trabajo Práctico 08 - Endpoints Persistentes de Reservas de Salas

Servicio de gestión y consulta de reservas de salas desarrollado en Node.js, Express y MongoDB (Mongoose), incorporando arquitectura por capas, sitio web (HTML/EJS) y una API RESTful JSON probada mediante Postman.

---

## 1. Origen y Evolución
Este proyecto evoluciona a partir del **TP 07**. Se migró el almacenamiento en memoria y semillero local a un modelo persistente mediante **MongoDB Atlas**.
- **Cambio principal:** Se eliminaron las fuentes de datos en memoria y la carga automática de semillas (`semilla.json`) al iniciar o listar. El servicio de datos ahora es 100% asíncrono y conectado a la base de datos `reservas_salas_u8`.

---

## 2. Tecnologías y Versiones
- **Node.js:** v24.14.0 (o superior con soporte nativo de `--env-file`)
- **Runtime / Framework:** Express v5.x
- **ORM / ODM:** Mongoose v8.x
- **Motor de Plantillas:** EJS
- **Middleware Auxiliar:** Morgan (logging)
- **Cliente de Pruebas API:** Postman Desktop

---

## 3. Preparación del Entorno y Variables de Entorno

### Configuración de MongoDB Atlas
1. Crear un clúster gratuito **MongoDB Atlas Free (M0)**.
2. Crear la base de datos `reservas_salas_u8` y la colección `reservas`.
3. Configurar un usuario de base de datos con permisos de lectura/escritura y permitir el acceso de red IP según sea necesario.

### Archivo `.env` (Plantilla de configuración)
Cree un archivo `.env` en la raíz del proyecto (este archivo **NO** se sube al repositorio):

```env
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/reservas_salas_u8?retryWrites=true&w=majority