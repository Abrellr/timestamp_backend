const bcrypt = require('bcrypt')
const userController = require('./userController')

exports.login = async (req, res) => {
    const { username, password } = req.body
    const sqlQuery = `
    SELECT * 
    FROM users
    WHERE username=$1
    AND password=$2;
    `
    const values = [ username, password]

    try {
        const res = await client.query(sqlQuery, values)
        console.log(res.rows[0])
    } catch (err) {
        console.log(err.stack)
    }
    
}

// let user = await userController.getOne({ username })
//     if (!username) return res.status(400).send('Invalid Credentials') // bad request
//     const match = await bcrypt.compare(password, users.password)
//     if (!match) return res.status(400).send('Invalid Credentials') // bad request
//     const token = user.createToken()
//     res.set('x-authorization-token', token).send("Login successful!")