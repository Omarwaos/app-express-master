/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('usuarios').del()
  await knex('personas').del()
  await knex('personas').insert([
    {id: 1, apellidos: 'Cardenas', nombres: 'Hugo', telefono: '934569234', email:'hugo@gmai.com', direccion: 'Chincha'},
    {id: 2, apellidos: 'Perez', nombres: 'Paco', telefono: '938746454', email:'paco@gmail.com', direccion: 'Grocio Prado'},
    {id: 3, apellidos: 'Magallanes', nombres: 'Luis', telefono: '938736345', email:'luis@gmail.com', direccion: 'Pueblo Nuevo'}
  ]);
};
