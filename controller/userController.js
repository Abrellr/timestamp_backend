const client = require("../client");

exports.getAll = (req, res) => {
    client
        .query("SELECT * FROM users")
        .then((data) => res.json(data.rows))
        .catch((e) => console.log(e));
}

exports.getOne =  (req, res, next) => {
    const { user_id } = req.params;
    client
        .query("SELECT * FROM users WHERE user_id=$1", [user_id])
        .then((data) => res.json(data.rows))
        .catch((e) => console.log(e));  
};


