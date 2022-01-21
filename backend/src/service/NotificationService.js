const CustomerService = require('./CustomerService')
const { sendMail } = require('../lib/nodemailer')
const { encode } = require('../lib/jsonwebtoken')
const ejs = require('ejs')

const isRequiredData = (data) => {
    return data === '' || data === null || data === undefined
}

const notifyCustomer = async (customer_id) => {
    if (isRequiredData(customer_id)) throw new Error('customer_id is required')
    const customer = await CustomerService.getCustomer(customer_id)
    const token = encode({ id: customer.id, }, '7d')
    const html = await ejs.renderFile('src/view/index.ejs', {
        name: customer.name,
        url: `http://localhost:3000?token=${token}`
    })
    await sendMail({
        name: customer.name,
        email: customer.email,
        subject: 'Queremos ouvir você',
        html
    })
}

module.exports = {
    notifyCustomer,
}
