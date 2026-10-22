const router = require('express').Router()
const c = require('../controllers/auth.controller') //Controlador que gestiona los permisos
const {verifyToken} = require('../middlewares/auth')
const {loginLimiter} = require('../middlewares/rateLimit')

//¿En un Login, qué verbo debemos utilizar?
//POST (porque vamos a enviar un paquete de datos :b, además damos protección a los datos)

//router.verbo('/ruta',controlador.accion)
//router.verbo('/ruta',token,controlador.accion)
router.post('/login', loginLimiter, c.login)
router.post('/logout', c.logout)
router.get('/me', verifyToken, c.me)

module.exports = router