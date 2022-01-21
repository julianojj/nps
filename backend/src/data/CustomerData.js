const database = require('../infra/database')
const { TYPES } = require('mssql')

const newCustomer = async (customer) => {
    const conn = await database.connect()
    await conn.request()
    .input('id', TYPES.VarChar, customer.id)
    .input('name', TYPES.VarChar, customer.name)
    .input('email', TYPES.VarChar, customer.email)
    .query(`INSERT INTO customers(id, name, email)
    values(@id, @name, @email)`)
    await conn.close()
}

const getCustomer = async (id) => {
    const conn = await database.connect()
    const customer = await conn.request()
    .input('id', TYPES.VarChar, id)
    .query(`SELECT *
    FROM customers
    WHERE id = @id`)
    await conn.close()
    return customer.recordset[0]
}

const getCustomerByEmail = async (email) => {
    const conn = await database.connect()
    const customer = await conn.request()
    .input('email', TYPES.VarChar, email)
    .query(`SELECT *
    FROM customers
    WHERE email = @email`)
    await conn.close()
    return customer.recordset[0]
}


module.exports = {
    newCustomer,
    getCustomer,
    getCustomerByEmail,
}
