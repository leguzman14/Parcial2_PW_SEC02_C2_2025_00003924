
const cuentas = require('../data/cuentas.json');

const listarCuentas = (req, res) => {
  return res.json({
    count: cuentas.length,
    data: cuentas,
  });
};
const obtenerCuentaPorId = (req, res) => {
  const { id } = req.params;
  const item = cuentas.find(c => String(c.id).toLowerCase() === String(id).toLowerCase());
  const finded = Boolean(item);
  return res.json({
    finded,
    account: item || null,
  });
};

// GET /api/cuentas?queryParam=valor
const buscarCuentasPorParametro = (req, res) => {
  const { queryParam } = req.query;
  const q = String(queryParam || '').trim().toLowerCase();
  if (!q) {
    return res.status(400).json({ msg: 'Falta queryParam' });
  }

  // Buscar por id exacto, nombre (incluye) o género (igual)
  const porId = cuentas.find(c => String(c.id).toLowerCase() === q);
  if (porId) {
    return res.json({
      finded: true,
      account: porId,
    });
  }

  const porGenero = cuentas.filter(c => String(c.gender).toLowerCase() === q);
  if (porGenero.length > 1) {
    return res.json({
      finded: porGenero.length > 0,
      data: porGenero,
    });
  } else if (porGenero.length === 1) {
    return res.json({
      finded: true,
      account: porGenero[0],
    });
  }

  // Por nombre 
  const porNombre = cuentas.filter(c => String(c.name).toLowerCase().includes(q));
  if (porNombre.length > 1) {
    return res.json({
      finded: porNombre.length > 0,
      data: porNombre,
    });
  } else if (porNombre.length === 1) {
    return res.json({
      finded: true,
      account: porNombre[0],
    });
  }

  return res.json({
    finded: false,
    data: [],
  });
};

// GET /api/cuentasBalance
const obtenerBalanceCuentas = (req, res) => {
  const activas = cuentas.filter(c => Boolean(c.isActive));
  const total = activas.reduce((acc, c) => acc + Number(c.balance || 0), 0);
  return res.json({
    status: activas.length > 0,
    accountBalance: Number(total.toFixed(2)),
  });
};

module.exports = {
  listarCuentas,
  obtenerCuentaPorId,
  buscarCuentasPorParametro,
  obtenerBalanceCuentas,
};
