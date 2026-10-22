//Aquí van funcionalidades compartidas que se puede usar en varias cosas :b

//Esta función simplifica el manejo de errores :b
exports.httpError = (status, message) =>
  Object.assign(new Error(message), { status });

//Campos obligatorios
exports.requireFields = (body, fields) => {
  const missing = fields.filter(
    (f) => body[f] === undefined || String(body[f]).trim() === "",
  );
  if (missing.length)
    throw exports.httpError(400, `Campos obligatorios: ${missing.join(", ")}`);
};

//Email escrito correctamente
exports.isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v));


//Validar las credenciales de acceso
exports.checkCredentials = (
  { nombre_usuario, clave_acceso },
  { claveObligatoria },
) => {
  if (!/^[a-zA-Z0-9_.-]{3,50}$/.test(nombre_usuario || ""))
    throw exports.httpError(
      400,
      "Usuario: 3 a 50 caracteres (letras, números, _ . -)",
    );
  if (
    (claveObligatoria || clave_acceso) &&
    (typeof clave_acceso !== "string" ||
      clave_acceso.length < 8 ||
      clave_acceso.length > 72)
  )
    throw exports.httpError(
      400,
      "La contraseña debe tener entre 8 y 72 caracteres",
    );
};
