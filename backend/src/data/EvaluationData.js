const database = require('../infra/database')
const { TYPES } = require('mssql')

const newEvaluation = async (evaluation) => {
    const conn = await database.connect()
    await conn.request()
    .input('id', TYPES.VarChar, evaluation.id)
    .input('note', TYPES.Int, evaluation.note)
    .input('comments', TYPES.VarChar, evaluation.comments)
    .input('customer_id', TYPES.VarChar, evaluation.customer_id)
    .query(`INSERT INTO evaluations(id, note, comments, customer_id)
    VALUES(@id, @note, @comments, @customer_id)`)
    await conn.close()
}

const getEvaluations = async () => {
    const conn = await database.connect()
    const evaluations = await conn.query(`SELECT * 
    FROM vw_evaluations`)
    await conn.close()
    return evaluations.recordset
}

const getEvaluation = async (id) => {
    const conn = await database.connect()
    const evaluation = await conn.request()
    .input('id', TYPES.VarChar, id)
    .query(`SELECT *
    FROM evaluations
    WHERE id = @id`)
    await conn.close()
    return evaluation.recordset[0]
}

const getEvaluationByCustomerId = async (customer_id) => {
    const conn = await database.connect()
    const evaluation = await conn.request()
    .input('customer_id', TYPES.VarChar, customer_id)
    .query(`SELECT * 
    FROM evaluations
    WHERE customer_id = @customer_id
    AND MONTH(created) = MONTH(GETDATE())
    AND YEAR(created) = YEAR(GETDATE())
    `)
    await conn.close()
    return evaluation.recordset[0]
}


module.exports = {
    newEvaluation,
    getEvaluations,
    getEvaluation,
    getEvaluationByCustomerId,
}
