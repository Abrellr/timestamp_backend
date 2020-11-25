const client = require("../client");

exports.getAll = (req, res) => {
    res.send('get all tasks working')
    // client
    //     .query("SELECT * FROM tasks")
    //     .then((data) => res.json(data.rows))
    //     .catch((e) => console.log(e));
}

exports.getOne =  (req, res, next) => {
    const { task_id } = req.params;
    client
        .query("SELECT * FROM tasks WHERE task_id=$1", [task_id])
        .then((data) => res.json(data.rows))
        .catch((e) => console.log(e));  
};


