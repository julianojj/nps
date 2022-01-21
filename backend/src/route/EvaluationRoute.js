const express = require('express')
const EvaluationService = require('../service/EvaluationService')

const router = express.Router()

router.post('/evaluations', async (req, res, next) => {
    try {
        await EvaluationService.newEvaluation(req.body)
        res.status(201).end()
    } catch (err) {
        next(err)
    }
})

router.get('/evaluations', async (req, res, next) => {
    try {
        const evaluations = await EvaluationService.getEvaluations()
        res.status(200).json(evaluations)
    } catch (err) {
        next(err)
    }
})

router.get('/evaluations/status/:id', async (req, res, next) => {
    try {
        const evaluation = await EvaluationService.checkStatusEvaluation(req.params.id)
        res.status(200).json(evaluation)
    } catch (err) {
        next(err)
    }
})

module.exports = router
