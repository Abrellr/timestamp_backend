const client = require("../database/client");

module.exports = {
  checkTask: (req, res, next) => {
    const { task_id } = req.params;
    client
      .query("SELECT * FROM tasks WHERE task_id=$1", [task_id])
      .then((data) => {
        if (!data.rows[0]) return res.sendStatus(404);
        req.task = data.rows[0];
        next();
      })
      .catch((e) => console.log(e));
  }
};

