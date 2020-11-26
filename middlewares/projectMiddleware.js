const client = require("../database/client");

module.exports = {
  checkProject: (req, res, next) => {
    const { project_id } = req.params;
    client
      .query("SELECT * FROM projects WHERE project_id=$1", [project_id])
      .then((data) => {
        if (!data.rows[0]) return res.sendStatus(404);
        req.projects = data.rows[0];
        next();
      })
      .catch((e) => console.log(e));
  }
};

