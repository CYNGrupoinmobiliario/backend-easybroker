// routes/propiedades.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

// Ruta para obtener propiedades que estén marcadas como "publicada"
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

        // Filtrar propiedades que estén en estado "publicada"
        const publicadas = response.data.content.filter(propiedad =>
            propiedad.status.toLowerCase() === "publicada"
        );

        res.json({ content: publicadas });
    } catch (error) {
        console.error("❌ Error al obtener propiedades:", error.message);
        res.status(500).json({ error: "Error al obtener propiedades" });
    }
});

// Exportar las rutas
module.exports = router;
