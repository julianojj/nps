const express = require('express')
const NPSService = require('../service/NPSService')

const router = express.Router()

router.get('/nps', async (req, res, next) => {
    try {
        const result = await NPSService.calculateNPS()
        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
})

module.exports = router
