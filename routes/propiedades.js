const express = require('express');
const axios = require('axios');
const router = express.Router();

const EASYBROKER_TOKEN = process.env.EASYBROKER_TOKEN;
const EASYBROKER_API_URL = 'https://api.easybroker.com/v1/properties';

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(EASYBROKER_API_URL, {
      headers: {
        'X-Authorization': EASYBROKER_TOKEN,
        'Accept': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('❌ Error al obtener propiedades:', error);
    res.status(500).json({ error: 'Error al obtener propiedades' });
  }
});

module.exports = router;
