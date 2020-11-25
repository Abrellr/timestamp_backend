const client = require("../client");

exports.getAll = (req, res) => {
    client
        .query("SELECT * FROM projects")
        .then((data) => res.json(data.rows))
        .catch((e) => console.log(e));
}

exports.getOne =  (req, res, next) => {
    const { project_id } = req.params;
    client
        .query("SELECT * FROM projects WHERE project_id=$1", [project_id])
        .then((data) => res.json(data.rows))
        .catch((e) => console.log(e));  
};


