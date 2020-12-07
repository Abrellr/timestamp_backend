const bcrypt = require('bcrypt')
const userController = require('./userController')

exports.login = async (req, res) => {
    const { email, password } = req.body

    let user = await userController.getOne({ email })
    if (!username) return res.status(400).send('Invalid Credentials') // bad request
    const match = await bcrypt.compare(password, users.password)
    if (!match) return res.status(400).send('Invalid Credentials') // bad request
    const token = user.createToken()
    res.set('x-authorization-token', token).send("Login successful!")
}