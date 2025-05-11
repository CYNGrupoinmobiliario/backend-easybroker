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

// Ruta para obtener propiedades destacadas
app.get("/api/propiedades-destacadas", async (req, res) => {
    try {
        const response = await axios.get("https://api.easybroker.com/v1/properties", {
            headers: {
                "X-Authorization": process.env.EASYBROKER_API_KEY,
            },
            params: {
                limit: 6,
                highlighted: true,
                status: "published" // Solo propiedades publicadas
            },
        });

        // Filtrar propiedades disponibles (no vendidas o rentadas)
        const propiedadesDisponibles = response.data.content.filter(propiedad => 
            propiedad.operations.some(op => op.status === "available")
        );

        res.json({ content: propiedadesDisponibles });
    } catch (error) {
        console.error("❌ Error al obtener propiedades destacadas:", error.message);
        res.status(500).json({ error: "Error al obtener propiedades destacadas" });
    }
});

// Ruta para manejar favicon.ico y evitar el error 404
app.get("/favicon.ico", (req, res) => res.sendStatus(204));

// Manejar rutas desconocidas para evitar errores 404 en el servidor
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

// Exportar el servidor para que Vercel lo use
module.exports = app;
