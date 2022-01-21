const express = require('express')
const CustomerService = require('../service/CustomerService')

const router = express.Router()

router.post('/customers', async (req, res, next) => {
    try {
        await CustomerService.newCustomer(req.body)
        res.status(201).end()
    } catch (err) {
        next(err)
    }
})

router.get('/customers/:id', async (req, res, next) => {
    try {
        const customer = await CustomerService.getCustomer(req.params.id)
        res.status(200).json(customer)
    } catch (err) {
        next(err)
    }
})

module.exports = router
