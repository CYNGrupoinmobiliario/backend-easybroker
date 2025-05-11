// routes/propiedades.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

// Ruta para obtener solo propiedades publicadas y disponibles
router.get("/propiedades", async (req, res) => {
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

        // Filtrar propiedades con operaciones disponibles
        const disponibles = response.data.content.filter(propiedad =>
            propiedad.operations.some(op =>
                op.status === "available" && !propiedad.archived
            )
        );

        res.json({ content: disponibles });
    } catch (error) {
        console.error("❌ Error al obtener propiedades:", error.message);
        res.status(500).json({ error: "Error al obtener propiedades" });
    }
});

// Ruta para obtener todas las propiedades sin filtro
router.get("/propiedades-sin-filtro", async (req, res) => {
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
        console.error("❌ Error al obtener propiedades sin filtro:", error.message);
        res.status(500).json({ error: "Error al obtener propiedades sin filtro" });
    }
});

// Exportar las rutas
module.exports = router;
