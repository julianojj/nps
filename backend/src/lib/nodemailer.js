const nodemailer = require('nodemailer')

const sendMail = async (data) => {
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NM_EMAIL,
            pass: process.env.NM_PASS,
        }
    })

    await transport.sendMail({
        from: process.env.EMAIL,
        to: `${data.name} <${data.email}>`,
        subject: data.subject,
        html: data.html
    })

    transport.close()
}

module.exports = {
   sendMail,
}
