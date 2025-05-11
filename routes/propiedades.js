// routes/propiedades.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

// Ruta principal para verificar que el servidor está activo
router.get("/", (req, res) => {
    res.send("🚀 API de EasyBroker está activa");
});

// Ruta para obtener solo propiedades publicadas y disponibles
router.get("/propiedades", async (req, res) => {
    try {
        const response = await axios.get("https://api.easybroker.com/v1/properties", {
            headers: {
                "X-Authorization": process.env.EASYBROKER_API_KEY,
            },
            params: {
                limit: 50,
                status: "published"  // Solo propiedades publicadas
            },
        });

        // Filtrar propiedades disponibles
        const propiedadesDisponibles = response.data.content.filter(propiedad => 
            propiedad.operations.some(op => op.status === "available")
        );

        res.json({ content: propiedadesDisponibles });
    } catch (error) {
        console.error("❌ Error al obtener propiedades publicadas:", error.message);
        res.status(500).json({ error: "Error al obtener propiedades publicadas" });
    }
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
        console.error("❌ Error al obtener todas las propiedades:", error.message);
        res.status(500).json({ error: "Error al obtener todas las propiedades" });
    }
});

// Exportar las rutas
module.exports = router;
