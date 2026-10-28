const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../config/db')
const {httpError, requireFields} = require('../utils')

//Configuración de cookies
const cookieOpts = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production'
}

//HASH temporal para evaluar la contraseña
const DUMMY_HASH = bcrypt.hashSync('dummy-password',10)


//exports.metodo = async (petición, respuesta) => {}
exports.login = async (req,res) => {
  requireFields(req.body, ['nombre_usuario', 'clave_acceso'])

  //Deserealización
  const {nombre_usuario, clave_acceso} = req.body

  //Validar el tipo de dato (seguridad XSS)
  if (typeof nombre_usuario !== 'string' || typeof clave_acceso !== 'string'){
    throw httpError(400, 'Datos no son correctos')
  }

  //Buscamos al usuario con el nombre...
  const user = await db('usuarios').where({nombre_usuario}).first()

  //
  const valid = await bcrypt.compare(clave_acceso, user ? user.clave_acceso : DUMMY_HASH)

  if(!user || !user.estado || !valid){
    //401 NO AUTORIZADO
    throw httpError(401, 'Usuario o Contraseña incorrecta')
  }

  //Si llegaste hasta aquí - Welcome :bbb
  //Habilitamos un permiso JWT
  const token = jwt.sign({
    id: user.id,
    nombre_usuario: user.nombre_usuario,
    nivel_acceso: user.nivel_acceso
  }, process.env.JWT_SECRET,{
    algorithm: 'HS256',
    expiresIn: process.env.JWT_EXPIRES_IN
  })

  res.cookie('token', token, cookieOpts).json({message: 'Bienvenido'})

}

exports.logout = async (req,res) => {
  res.clearCookie('token', cookieOpts).json({message: 'Sesion finalizada'})
}

//Función que retorne la información completa del usuario
//Usuario > persona
exports.me = async () => {
  //Objetivo es hacer una consulta multitabla para obtener los datos del usuario
  const usuario = await db('usuarios as u')
    .join('personas as p', 'p.id','u.idpersona')
    .where('u.id', req.user.id)
    .select('ud.id', 'u.nombre_usuario', 'u.nivel_acceso', 'p.nombres', 'p.apellidos')

  if(!usuario) throw httpError(401, 'Usuario no encontrado')

  //Si existe envío los datos como JSON
  res.json(usuario)
}