// index.js
const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();

// Habilitar CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// Ruta principal para verificar que el servidor está activo
app.get("/", (req, res) => {
    res.send("🚀 API de EasyBroker está activa");
});

// Importar rutas desde routes/propiedades.js
const propiedadesRoutes = require("./routes/propiedades");
app.use("/api", propiedadesRoutes);

// Ruta para manejar favicon.ico y evitar el error 404
app.get("/favicon.ico", (req, res) => res.sendStatus(204));

// Manejar rutas desconocidas para evitar errores 404 en el servidor
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

// Exportar el servidor para que Vercel lo use
module.exports = app;
