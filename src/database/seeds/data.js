const { hashPassword } = require("../../helpers/bcrypt.helper");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex.raw("TRUNCATE TABLE users CASCADE")
  await knex.raw("TRUNCATE TABLE user_roles_mapping CASCADE")
  await knex.raw("TRUNCATE TABLE roles CASCADE")
  await knex.raw("TRUNCATE TABLE account CASCADE")
  await knex.raw("TRUNCATE TABLE lender_offer CASCADE")
  await knex.raw("TRUNCATE TABLE loan_application CASCADE")
  await knex('roles').insert([
    { id: 1, role_name: 'BORROWER' },
    { id: 2, role_name: 'LENDER' },
    { id: 3, role_name: 'ADMIN' }
  ]);
  await knex("users").insert([
    {
      id: 1,
      first_name: "John",
      last_name: 'Doe',
      email: "john@gmail.com",
      password: hashPassword("Password123")
    },
    {
      id: 2,
      first_name: "Mary",
      last_name: 'Jane',
      email: "jane@gmail.com",
      password: hashPassword("Password123")
    },
    {
      id: 3,
      first_name: "Tom",
      last_name: 'Jerry',
      email: "tom@gmail.com",
      password: hashPassword("Password123")
    }
  ])
  await knex("account").insert([
    {
      account_number: 1,
      balance_amount: 100,
      user_id: 1
    },
    {
      account_number: 2,
      balance_amount: 0,
      user_id: 2
    },
    {
      account_number: 3,
      balance_amount: 0,
      user_id: 3
    },
  ])
  await knex("user_roles_mapping").insert([
    {
      id: 1,
      user_id: 1,
      role_id: 1
    },
    {
      id: 2,
      user_id: 2,
      role_id: 2
    },
    {
      id: 3,
      user_id: 3,
      role_id: 3
    },
  ])
  await knex("lender_offer").insert([
    {
      id: 1,
      loan_type: "mortage",
      interest_rate: 3.5,
      payment_period: 3,
      amount_offered: 4000,
      status: "AVAILABLE",
      user_id: 2
    },
    {
      id: 2,
      loan_type: "student_loan",
      interest_rate: 2.5,
      payment_period: 5,
      amount_offered: 3000,
      status: "AVAILABLE",
      user_id: 2
    }
  ])
  await knex("loan_application").insert([
    {
      id: 1,
      amount_requested: 10000,
      amount_payed: 0,
      status: "PENDING",
      user_id: 1,
      lender_offer_id: 2
    },
    {
      id: 2,
      amount_requested: 2000,
      amount_payed: 0,
      status: "PENDING",
      user_id: 1,
      lender_offer_id: 1
    },
    {
      id: 3,
      amount_requested: 1000,
      amount_payed: 0,
      status: "PENDING",
      user_id: 1,
      lender_offer_id: 2
    },
    {
      id: 4,
      amount_requested: 1500,
      amount_payed: 0,
      status: "PENDING",
      user_id: 1,
      lender_offer_id: 2
    }
  ])
};
