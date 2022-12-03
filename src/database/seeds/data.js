const { hashPassword } = require("../../helpers/bcrypt.helper");
const { account } = require("../../utils/mock/account.data");
const { lenderOffer } = require("../../utils/mock/lender.data");
const { loanApplication } = require("../../utils/mock/loan.data");
const { role } = require("../../utils/mock/role.data");
const { user } = require("../../utils/mock/user.data");
const { userRole } = require("../../utils/mock/user.role.data");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  try {
    // Deletes ALL existing entries
    await knex.raw("TRUNCATE TABLE users CASCADE")
    await knex.raw("TRUNCATE TABLE user_roles_mapping CASCADE")
    await knex.raw("TRUNCATE TABLE roles CASCADE")
    await knex.raw("TRUNCATE TABLE account CASCADE")
    await knex.raw("TRUNCATE TABLE lender_offer CASCADE")
    await knex.raw("TRUNCATE TABLE loan_application CASCADE")
    await knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1")
    await knex.raw("ALTER SEQUENCE roles_id_seq RESTART WITH 1")
    await knex.raw("ALTER SEQUENCE user_roles_mapping_id_seq RESTART WITH 1")
    await knex.raw("ALTER SEQUENCE account_account_number_seq RESTART WITH 1")
    await knex.raw("ALTER SEQUENCE lender_offer_id_seq RESTART WITH 1")
    await knex.raw("ALTER SEQUENCE loan_application_id_seq RESTART WITH 1")
    return knex('users').insert(user).returning("*")
      .then(async (users) => {
        let promises = [];
        const roles = await knex('roles').insert(role).returning("*")
        users.forEach(async (user) => {
          account.forEach(async (acc) => {
            if (users.indexOf(user) == account.indexOf(acc)) {
              console.log("insert account")
              const accounting = knex("account").insert({
                balance_amount: acc.balance_amount,
                user_id: user.id
              })
              promises.push(accounting)
            }
          })
          roles.forEach(async (role) => {
            if (users.indexOf(user) == roles.indexOf(role)) {
              console.log("inserting role mapping")
              const mapping = await knex("user_roles_mapping").insert({
                role_id: role.id,
                user_id: user.id
              })
              promises.push(mapping)
            }
          })
          const lender = await knex("lender_offer").insert({ ...lenderOffer[users.indexOf(user)], user_id: user.id }).returning("*")
          await knex("loan_application").insert({ ...loanApplication[users.indexOf(user)], user_id: user.id, lender_offer_id: lender[0].id })

          // promises.push(lender)
        })
        return Promise.all(promises);
      })
      .catch((error) => {
        console.log(error)
      })

  } catch (error) {
    console.log(error)
    throw (error)
  }

};
