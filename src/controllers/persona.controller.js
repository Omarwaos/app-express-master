const db = require('../config/db')
const {httpError, requireFields, isEmail} = require('../utils')

//Lista de campos obligatorios
//Omitir los campos que son NULL
const camposRequeridos = ['apellidos', 'nombres', 'telefono', 'email', 'direccion']


//Evaluamos que el contenido de cada campo sea de tipo cadena
//(1) arreglo > (2) filter > (3) map> (4) operador ternario
//filter()  : retorna un arreglo que cumpla una condición
//map()     : recorre TODA la estructura / objeto
const pick = (body) => {
  Object.fromEntries(
    camposRequeridos.filter((key) => key in body).map(
      (key) => [key, typeof body[key] === 'string' ? body[key].trim() : body[key]]
    )
  )
}

exports.list = async (req,res) => {
  res.json(
    await db("personas")
      .select("id", ...camposRequeridos)
      .orderBy("apellidos")
  )
}

exports.get = async (req,res) => {
  const row = await db("personas").where({id: req.params.id}).first()
  if(!row) throw httpError(404,'Persona no encontrada')
  res.json(row)
}

exports.create = async (req,res) => {
  //Campos obligatorios
  requireFields(req.body, ["apellidos", "nombres","email"])

  //Nota: solo es posible validar el email si es OBLIGATORIO
  if(!isEmail(req.body.email)){
    throw httpError(400, "Email incorrecto")
  }
  //Insertar (validando que solo envíes cadenas)
  const [id] = await db("personas").insert(pick(req.body))

  req.status(201).json({id, message: 'persona registrada correctamente'})
}

exports.update = async (req,res) => {
  requireFields(req.body, ["apellidos", "nombres", "email"])
    if(!isEmail(req.body.email)){
    throw httpError(400, "Email incorrecto")
  }

  const num = await db("personas")
    .where({id: req.params.id})
    .update(pick(req.body))

    if(!num) throw httpError(404, "Persona no encontrada")

    res.json({message: "Persona actualizada correctamente"})
}

exports.remove = async (req,res) => {
  const num = await db("personas")
    .where({id: req.params.id})
    .del()

  if(!num) throw httpError(404, "Persona no encontrada")
  res.json({message: "Persona eliminada correctamente"})
}

