// routes/propiedades.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

// Ruta principal para verificar que el servidor está activo
router.get("/", (req, res) => {
    res.send("🚀 API de EasyBroker está activa");
});

// Ruta para obtener todas las propiedades sin filtro
router.get("/propiedades-todas", async (req, res) => {
    try {
        const response = await axios.get("https://api.easybroker.com/v1/properties", {
            headers: {
                "X-Authorization": process.env.EASYBROKER_API_KEY,
            },
            params: {
                limit: 50
            },
        });

        res.json({ content: response.data.content });
    } catch (error) {
        console.error("❌ Error al obtener propiedades:", error.message);
        res.status(500).json({ error: "Error al obtener propiedades" });
    }
});

// Exportar las rutas
module.exports = router;
