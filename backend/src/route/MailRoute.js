const express = require('express')
const NotificationService = require('../service/NotificationService')
const ejs = require('ejs')

const router = express.Router()

router.post('/send', async (req, res, next) => {
    try {
        await NotificationService.notifyCustomer(req.body.customer_id)
        res.status(204).end();
    } catch (err) {
        next(err)
    }
})

router.get('/send', async (req, res, next) => {
    try {
        const html = await ejs.renderFile('src/view/index.ejs', {
            name: 'Juliano',
            url: `http://localhost:3000?token=123`
        })
        res.status(200).send(html)
    } catch (err) {
        next(err)
    }
})

module.exports = router
