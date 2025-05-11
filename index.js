// index.js
const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();

// Permitir CORS para que el frontend pueda hacer solicitudes
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
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
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error("❌ Error al obtener propiedades destacadas:", error.message);
        res.status(500).json({ error: "Error al obtener propiedades destacadas" });
    }
});

// Ruta para obtener todas las propiedades
app.get("/api/propiedades", async (req, res) => {
    try {
        const response = await axios.get("https://api.easybroker.com/v1/properties", {
            headers: {
                "X-Authorization": process.env.EASYBROKER_API_KEY,
            },
            params: {
                limit: 20,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error("❌ Error al obtener propiedades:", error.message);
        res.status(500).json({ error: "Error al obtener propiedades" });
    }
});

// Exportar el servidor para que Vercel lo use
module.exports = app;
