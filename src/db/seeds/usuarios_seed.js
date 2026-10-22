const bcrypt = require('bcryptjs')
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('usuarios').insert([
    {id: 1, idpersonas: 1,nombre_usuario: 'hugo',clave_acceso:bcrypt.hashSync('hugo123*', 10), nivel_acceso: 'ADMIN', estado:true},
    {id: 2, idpersonas: 2,nombre_usuario: 'paco',clave_acceso:bcrypt.hashSync('paco123?', 10), nivel_acceso: 'USUARIO', estado:true}
  ]);
};
