require("dotenv").config()

//Módulos de la aplicación
const path = require('path') //Gestión de rutas
const express = require('express') //Framework Backend
const helmet = require('helmet') //Seguridad - JWT (Json Web Token)
const cookieParser = require('cookie-parser') //Cookie (archivo guarda configuración - navegador)

//Gestión de rutas
const routes = require('./routes')

//Otras configuraciones
const {apiLimiter} = require('./middlewares/rateLimit')
const {notFound, errorHandle, errorHandler} = require('./middlewares/errorHandler')

const app = express() //Inicializar Framework
const isProd = process.env.NODE_ENV === 'production' //Evalúa el tipo de entorno

//Proxy = máscara de navegación (Ngnix)
if(process.env.TRUST_PROXY) app.set('trust proxy', Number(process.env.TRUST_PROXY))

//Configuración de seguridad
//Cross-Site Scripting (XSS)
app.use(helmet({
  contentSecurityPolicy:{
    useDefaults:true,
    directives: {
      'style-src':["'self'"],
      'upgrade-insecure-request': isProd ? [] : null
    }
  }
}))

//Configurando express...
app.use(express.json({limit: '10kb'})) //Tamaño máximo JSON
app.use(cookieParser()) //Leer cookie (configuración)
app.use(express.static(path.join(__dirname,'..','public'))) // Ruta Frontend

//Configuración de ruta
app.use('/api', apiLimiter, routes)

//Ruta raíz '/' (dev) localhost:3000, (prod) miapp.com
app.get('/',(req,res)=> res.redirect('/index.html'))

//Manejamos rutas inexistentes
app.use('/api', notFound)
app.use(errorHandler)

//Exportamos este módulo
module.exports = app