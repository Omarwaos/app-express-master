require("dotenv").config() // .env (texto plano con claves)
require("./config/env") //validar variables antes de iniciar la app

const app = require('./app')
const db = require('./config/db')

const port = process.env.PORT || 3000

//App Empresa X
//2 Base de datos
// BD production
// BD development
db.raw('select 1')
  .then(() => app.listen(port,
    () => console.log(`Servidor iniciado en http://localhost:${port}`)
  ))
  .catch((e) => console.error(`No se pudo realizar la conexión: ${e.message}`))