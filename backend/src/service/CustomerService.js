const CustomerData = require('../data/CustomerData')
const { randomUUID } = require('crypto')

const isRequiredData = (data) => {
    return data === '' || data === null || data === undefined
}

const newCustomer = async (customer) => {
    if (isRequiredData(customer.name)) throw new Error('name is required')
    if (isRequiredData(customer.email)) throw new Error('email is required')
    const customerAlreadyExists = await CustomerData.getCustomerByEmail(customer.email)
    if (customerAlreadyExists) throw new Error('customer already exists')
    customer.id = randomUUID()
    await CustomerData.newCustomer(customer)
}

const getCustomer = async (id) => {
    const customer = await CustomerData.getCustomer(id)
    if (!customer) throw new Error('customer not found')
    return customer
}

module.exports = {
    newCustomer,
    getCustomer,
}
