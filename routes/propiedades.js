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
                status: "published"  // Solo propiedades publicadas
            },
        });

        // Filtrar propiedades disponibles
        const disponibles = response.data.content.filter(propiedad => {
            return propiedad.operations.some(op => 
                (op.status === "available" || op.status === "published") &&  // Verifica que estén disponibles o publicadas
                op.type !== "sold" && op.type !== "rented" &&  // Excluye vendidas o rentadas
                !propiedad.archived  // Excluye propiedades archivadas
            );
        });

        res.json({ content: disponibles });
    } catch (error) {
        console.error("❌ Error al obtener propiedades:", error.message);
        res.status(500).json({ error: "Error al obtener propiedades" });
    }
});

// Exportar las rutas
module.exports = router;
