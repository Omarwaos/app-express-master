const router = require('express').Router()
const c = require('../controllers/auth.controller') //Controlador que gestiona los permisos
const {verifyToken} = require('../middlewares/auth')
const {loginLimiter} = require('../middlewares/rateLimit')

//¿En un Login, qué verbo debemos utilizar?
//POST (porque vamos a enviar un paquete de datos :b, además damos protección a los datos)
router.post('/login', loginLimiter, c)