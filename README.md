# Backend Cuentas API (Node + Express)

Puerto por defecto: **3130**

## Requisitos
- Node.js 18+
- npm

## Instalación
```bash
npm install
npm run dev
# o en producción
npm start
```

Servidor: `http://localhost:3130`

Todas las rutas cuelgan de `/api`.

## Rutas
- `GET /api/cuentas` → lista todas las cuentas `{ count, data }`
- `GET /api/cuenta/:id` → una cuenta por id `{ finded, account }`
- `GET /api/cuentas?queryParam=valor` → busca por id exacto, género (male/female) o nombre (contiene). Respuesta:
  - Si 1 resultado: `{ finded: true, account }`
  - Si varios: `{ finded: true, data: [...] }`
  - Si ninguno: `{ finded: false, data: [] }`
- `GET /api/cuentasBalance` → suma balances de cuentas activas `{ status, accountBalance }`

## Ejemplos con curl
```bash
curl http://localhost:3130/api/cuentas
curl http://localhost:3130/api/cuenta/A01
curl "http://localhost:3130/api/cuentas?queryParam=female"
curl "http://localhost:3130/api/cuentas?queryParam=ana"
curl http://localhost:3130/api/cuentasBalance
```
