// routes/propiedades.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

// Ruta temporal para revisar propiedades sin filtro
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

        // Muestra todas las propiedades sin filtro
        res.json({ content: response.data.content });
    } catch (error) {
        console.error("❌ Error al obtener propiedades sin filtro:", error.message);
        res.status(500).json({ error: "Error al obtener propiedades sin filtro" });
    }
});

// Exportar las rutas
module.exports = router;
