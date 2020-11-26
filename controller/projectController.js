const client = require("../database/client");


//get all projects
exports.getAll = (req, res) => {
    client
        .query("SELECT * FROM projects")
        .then((data) => res.json(data.rows))
        .catch((e) => console.log(e));
}

//get one project
exports.getOne =  (req, res, next) => {
    const { project_id } = req.params;
    client
        .query("SELECT * FROM projects WHERE project_id=$1", [project_id])
        .then((data) => res.json(data.rows))
        .catch((e) => console.log(e));  
};

//create one project
exports.createOne = (req, res, next) => {
    const { user_id, project_name, project_create_at } = req.body;
    const sqlQuery = `
        INSERT INTO projects(user_id, project_name, project_create_at)
        VALUES ($1, $2, $3)
        RETURNING *
    `;

    const values = [user_id, project_name, project_create_at]
    client 
        .query(sqlQuery, values)
        .then((data) => res.json(data.rows))
        .catch((err) => console.log(err))
}

//update project
exports.updateProject = (req, res, next) => {
    const { project_id } = req.params;
    const { user_id, project_name, project_create_at } = req.body;
    if(!project_name || !user_id  || !project_create_at ) return res.sendStatus(400)

    const sqlQuery = `
    UPDATE projects
    SET user_id=$1,
    project_name=$2,
    project_create_at=$3
    WHERE project_id=$4
    RETURNING *
    `;

    const values = [user_id, project_name, project_create_at, project_id]
    client
        .query(sqlQuery, values)
        .then((data) => res.json(data.rows))
        .catch((err) => console.log())
}


//delete project
exports.deleteProject = (req, res, next) => {
    const { project_id } = req.params;
    const sqlQuery = `
    DELETE FROM projects
    WHERE project_id=$1
    RETURNING *
    `;

    client
        .query(sqlQuery, [project_id])
        .then((data) => res.json(data.rows))
        .catch((err) => {
            res.sendStatus(500);
            console.log(err)
        })
}


