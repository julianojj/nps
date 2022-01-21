const jsonwebtoken = require("jsonwebtoken")

const encode = (data, expiresIn) => {
    return jsonwebtoken.sign({}, process.env.JWT_KEY, {
        subject: data.id,
        expiresIn
    })
}

module.exports = {
    encode,
}
