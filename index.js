require('dotenv').config();
const express = require('express');
const cors = require('cors');
const propiedadesRouter = require('./routes/propiedades');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use('/api/propiedades', propiedadesRouter);

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
