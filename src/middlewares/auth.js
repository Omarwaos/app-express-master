const jwt = require('jsonwebtoken')
const db = require('../config/db')

//No se exporta porque colabora con verifyToken
const unauthorized = (res,msg = 'No autorizado') => {
  res.status(401).json({message: msg})
}
//Funciones definidas como asincronas llevan promesas
exports.verifyToken = async (req,res,next) => {
  //Cookies = archivo que guardan la configuración
  //NOTA: En tu navegador INSPECCIONAR > RED
  const token = req.cookies.token

  if (!token) { return unauthorized(res)}

  //Existe el TOKEN
  //JWT = 3 partes :b
  let payload

  try{
    payload = jwt.verify(token,process.env.JWT_SECRET, {algorithms: ['HS256']})
  }catch(e){
    return unauthorized(res,'Sesión inválida o expirado ')
  }

  //Se consulta la BD para respetar usuarios desactivados
  const user = await db("usuarios").where({id : payload.id}).select('id','nombre_usuario','nivel_acceso','estado').first()

  if (!user || !user.estado){
    return unauthorized(res, 'Usuario inactivo o inexistente')
  }

  req.user = user;

  //¿Siguiente? -- Para que siga el flujo de la app :b
  next()

  
}

exports.requireLevel = (...niveles) => (req,res,next) => {
  niveles.includes(req.user.nivel_acceso) ?
  next() : res.status(403).json({message: 'No tienes permiso para esta acción'})
}