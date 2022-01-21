const EvaluationData = require('../data/EvaluationData')
const { randomUUID } = require('crypto')

const isRequiredData = (data) => {
    return data === '' || data === null || data === undefined
}

const newEvaluation = async (evaluation) => {
    if (isRequiredData(evaluation.note)) throw new Error('note is required')
    if (isRequiredData(evaluation.customer_id)) throw new Error('customer_id is required')
    const evaluationAlreadyExists = await EvaluationData.getEvaluationByCustomerId(evaluation.customer_id)
    if (evaluationAlreadyExists) throw new Error('evaluation already exists')
    evaluation.id = randomUUID()
    await EvaluationData.newEvaluation(evaluation)
}

const getEvaluations = () => {
    return EvaluationData.getEvaluations()
}

const checkStatusEvaluation = async (customer_id) => {
    const evaluationAlreadyExists = await EvaluationData.getEvaluationByCustomerId(customer_id)
    return {
        status: evaluationAlreadyExists ? 'finished' : 'available'
    }
}

module.exports = {
    newEvaluation,
    getEvaluations,
    checkStatusEvaluation,
}
