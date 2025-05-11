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

// Ruta para obtener propiedades publicadas y disponibles
app.get("/api/propiedades", async (req, res) => {
    try {
        const response = await axios.get("https://api.easybroker.com/v1/properties", {
            headers: {
                "X-Authorization": process.env.EASYBROKER_API_KEY,
            },
            params: {
                limit: 50,
                status: "published"
            },
        });

        // Filtrar propiedades que tienen operaciones de venta o renta (sin verificar status)
        const propiedadesDisponibles = response.data.content.filter(propiedad => 
            propiedad.operations.some(op => 
                op.type === "sale" || op.type === "rent"
            )
        );

        res.json({ content: propiedadesDisponibles });
    } catch (error) {
        console.error("❌ Error al obtener propiedades disponibles:", error.message);
        res.status(500).json({ error: "Error al obtener propiedades disponibles" });
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
