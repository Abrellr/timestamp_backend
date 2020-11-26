const client = require("../database/client");


//get all user
exports.getAll = (req, res) => {
    client
        .query("SELECT * FROM users")
        .then((data) => res.json(data.rows))
        .catch((err) => console.log(err));
}

//get one user
exports.getOne =  (req, res, next) => {
    const { user_id } = req.params;
    client
        .query("SELECT * FROM users WHERE user_id=$1", [user_id])
        .then((data) => res.json(data.rows))
        .catch((err) => console.log(err));  
};

//create user
exports.createUser = (req, res, next) => {
    const { username, email, password } = req.body
    const sqlQuery = `
    INSERT INTO users(username, email, password)
    VALUES ($1, $2, $3)
    RETURNING *
    `;
    const values = [username, email, password];
    client
        .query(sqlQuery, values)
        .then((data) => res.json(data.rows))
        .catch((err) => console.log(err))
}

//update user
exports.updateUser = (req, res, next) => {
    const { user_id } = req.params;
    const { username, email, password } = req.body;

    if(!username || !email ) return res.sendStatus(400);

    const sqlQuery = `
    UPDATE users
    SET username=$1,
    email=$2,
    password=$3
    WHERE user_id=$4
    RETURNING *
    `;

    const values = [username, email, password, user_id]

    client 
        .query(sqlQuery, values)
        .then((data) => res.json(data.rows))
        .catch((err) => {
            res.sendStatus(500)
        })
}

//delete user
exports.deleteUser = (req, res, next) => {
    const { user_id } = req.params;
    const sqlQuery = `
    DELETE FROM users
    WHERE user_id=$1
    RETURNING *
    `;

    client
        .query(sqlQuery, [user_id])
        .then((data) => res.json(data.rows))
        .catch((err) => {
            res.sendStatus(500);
            console.log(err)
        })
}


