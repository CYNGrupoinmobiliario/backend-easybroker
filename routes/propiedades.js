// routes/propiedades.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

// Ruta para propiedades solo publicadas
router.get("/propiedades", async (req, res) => {
    try {
        const response = await axios.get("https://api.easybroker.com/v1/properties", {
            headers: {
                "X-Authorization": process.env.EASYBROKER_API_KEY,
            },
            params: {
                limit: 50
            },
        });

        // Filtrar solo propiedades publicadas
        const publicadas = response.data.content.filter(propiedad =>
            propiedad.operations.some(op => op.status === "available")  // Solo operaciones disponibles
        );

        res.json({ content: publicadas });
    } catch (error) {
        console.error("❌ Error al obtener propiedades publicadas:", error.message);
        res.status(500).json({ error: "Error al obtener propiedades publicadas" });
    }
});

// Exportar las rutas
module.exports = router;
