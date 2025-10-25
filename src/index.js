const express = require('express');
const cors = require('cors');
const cuentasRouter = require('./routes/cuentas.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ ok: true, msg: 'API de cuentas activa' });
});

app.use('/api', cuentasRouter);

const PORT = process.env.PORT || 3130;
app.listen(PORT, () => {
  console.log(`Servidor listo en http://localhost:${PORT}`);
});
