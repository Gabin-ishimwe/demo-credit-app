/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('roles').del()
  await knex('roles').insert([
    { id: 1, role_name: 'BORROWER' },
    { id: 2, role_name: 'LENDER' },
    { id: 3, role_name: 'ADMIN' }
  ]);
};
