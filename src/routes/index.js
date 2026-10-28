const router = require('express').Router()

//JWT = limitar el uso de las rutas
const {verifyToken, requireLevel} = require('../middlewares/auth')

//Rutas App (expandiendo según módulos)
//Versión 1:Login (público)
router.use('/auth',require('./auth.routes'))
router.use('/personas', verifyToken, require('./persona.routes'))
router.use('/usuarios', verifyToken, requireLevel('ADMIN'), require('./usuario.routes'))

module.exports = router