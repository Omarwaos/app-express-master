
//--VALIDACIÓN #01 -- PARÁMETROS DE .env
//Validación de variables de configuración

const required = ['DB_HOST','DB_USER','DB_NAME','JWT_SECRET']

//Verificamos si una de las claves no existe o está vacía
const missing = required.filter((key) => !process.env[key])

//Si no encontré una de las claves...
if(missing.length){
  console.error(`Faltan variables de entorno: ${missing.join(',')}`)
  process.exit(1)
}

//VALIDACIÓN #02 -- JWT SEGURO
//Para encriptar la comunicación, JWT necesita mínimo 32 caracteres
const secret = process.env.JWT_SECRET

if(secret.length < 32){
  console.error('JSON_SECRET requiere una clave de 32 caracteres')
  process.exit(1)
}