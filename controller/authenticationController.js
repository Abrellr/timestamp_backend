const client = require("../database/client");
const bcrypt = require('bcrypt')


exports.login = async (req, res) => {
    const { username, password } = req.body
    const sqlQuery = `
    SELECT * 
    FROM users
    WHERE username=$1
    AND password=$2;
    `
    const values = [ username, password]
    const user = await client.query(sqlQuery, values)
    if (!user) return res.status(400).send('Invalid Credentials') // bad request
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).send('Invalid Credentials') // bad request
    const token = user.createToken()
    res.set('x-authorization-token', token).send("Login successful!")
    
}

    