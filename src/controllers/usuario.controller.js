const bcrypt = require("bcryptjs")
const db = require("../config/db")
const {httpError, requireFields, checkCredentials} = require("../utils")

//Perfiles o roles de usuario
const NIVELES = ["ADMIN", "USUARIO"]

//Consulta básica
const baseQuery = () => {
  db("usuarios as u")
    .join("personas as p","p.id","u.idpersona")
    .select(
      "u.id",
      "u.idpersona",
      "u.nombre_usuario",
      "u.nivel_acceso",
      "u.estado",
      "p.apellidos",
      "p,nombres"
    )
}

//Verificar nivel (asegurar que solo sea un perfil de la lista)
const checkNivel = (nivel) => {
  //Si la variable no está definida y si no encontré el nivel en el arreglo
  if(nivel !== undefined && !NIVELES.includes(nivel)){
    throw httpError(400, "Nivel de acceso incorrecto")
  }
}

//Listar
exports.list = async (req, res) => {
  res.json(await baseQuery().orderBy("u.id"))
}
exports.get = async (req, res) => {
  const row = await baseQuery().where("ud.id",req.params.id).first()
  if(!row) throw httpError(404,"Usuario no existe")
    res.json(row)
}
exports.create = async (req, res) => {
  requireFields(req.body, ["idpersona","nombre_usuario", "clave_acceso"])

  //Deserealizar los datos que vienen en body
  const {idpersona, nombre_usuario, clave_acceso, nivel_acceso, estado} = req.body

  checkNivel(nivel_acceso)

  //Verificar credencial
  checkCredentials(req.body,{claveObligatoria:true})

  //Creamos el usuario
const [id] = await db("usuarios").insert({
    idpersona,
    nombre_usuario,
    nivel_acceso,
    estado,
    clave_acceso: await bcrypt.hash(clave_acceso,10)
  })
  res.status(201).json({id, message:'Usuario creado correctamente'})
}


exports.update = async (req, res) => {}

//Eliminar
//Nota: Verifique las políticas de seguridad y reglas del negocio
exports.remove = async (req, res) => {
  //¿Es posible elimar tu propio usuario?
  // SI -- NO [X]
  if(Number(req.params.id) === req.user.id){
    throw httpError(400, "No puedes eliminar tu propio usuario")
  }

  const num = await db("usuarios")
    .where({id: req.params.id})
    .del()

  if(!num) throw httpError(404, "Usuario no existe")
  res.json({message: 'Usuario eliminado'})
}