const rateLimit = require('express-rate-limit')

//Estas funciones controlarán la cantidad de intentos y el tráfico en nuestra aplicación


//Fujo de login (intentos)
//windowMs    :Tiempo en Milisegundos
//limit       :Intentos por IP
exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Demasiados intentos, verifique en unos minutos'}
})

//Flujo de solicitudes (usuarios que se conectan)
exports.apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: {message: 'Demasiadas solicitudes, intente en un momento'}
})