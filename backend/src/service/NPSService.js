const EvaluationDate = require('../data/EvaluationData')

const getTotalEvaluationPerBrand = (evaluations, brand) => {
    return evaluations.filter(evaluation => evaluation.brand === brand)
    .map(value => value.total)[0]
}

const calculateNPS = async () => {
    const evaluations = await EvaluationDate.getEvaluationCurrencyDate()
    const promoters = getTotalEvaluationPerBrand(evaluations, 'Promotor')
    const neuter = getTotalEvaluationPerBrand(evaluations, 'Neutro')
    const detrators = getTotalEvaluationPerBrand(evaluations, 'Detrator')
    const total = promoters + neuter + detrators
    return {
        promoters: promoters,
        neuter: neuter,
        detrators: detrators,
        total: total,
        nps: ((promoters - detrators) / total) * 100,
    }
}

module.exports = {
    calculateNPS,
}
