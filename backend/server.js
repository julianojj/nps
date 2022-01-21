require('dotenv/config')
const express = require('express')
const cors = require('cors')

const app = express()

app.disable('x-powered-by')

app.use(cors())

app.use(express.json())

app.use('/public', express.static('public'))

app.use('/v1', require('./src/route/CustomerRoute'))
app.use('/v1', require('./src/route/EvaluationRoute'))
app.use('/v1', require('./src/route/MailRoute'))

app.use((req, res, next) => {
    res.status(404).json({
        message: 'resource not found',
        statusCode: res.statusCode
    })
    next()
})

app.use((err, req, res, next) => {
    if (
        err.message === 'name is required'
        || err.message === 'email is required'
        || err.message === 'customer_id is required'
        || err.message === 'note is required'
    ) {
        return res.status(400).json({
            message: err.message,
            statusCode: res.statusCode
        })
    }
    if (
        err.message === 'customer already exists'
        || err.message === 'evaluation already exists'
    ) {
        return res.status(422).json({
            message: err.message,
            statusCode: res.statusCode
        })
    }
    if (err.message === 'customer not found') {
        return res.status(404).json({
            message: err.message,
            statusCode: res.statusCode
        })
    }
    console.log(err)
    res.status(500).json({
        message: 'internal server error',
        statusCode: res.statusCode
    })
    next()
})

app.listen(5000)
