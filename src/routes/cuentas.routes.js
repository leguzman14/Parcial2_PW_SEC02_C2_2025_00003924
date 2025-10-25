const { Router } = require('express');
const {
  listarCuentas,
  obtenerCuentaPorId,
  buscarCuentasPorParametro,
  obtenerBalanceCuentas,
} = require('../controllers/cuentas.controller');

const router = Router();

// GET /api/cuentas  (lista o búsqueda con queryParam) Para buscaer por genero por ejemplo
router.get('/cuentas', (req, res) => {
  const { queryParam } = req.query;
  if (typeof queryParam === 'string' && queryParam.trim() !== '') {
    return buscarCuentasPorParametro(req, res);
  }
  return listarCuentas(req, res);
});

// GET /api/cuenta/:id (una cuenta por id exacto)
router.get('/cuenta/:id', obtenerCuentaPorId);

// GET /api/cuentasBalance (suma balances de cuentas activas)
router.get('/cuentasBalance', obtenerBalanceCuentas);

module.exports = router;
