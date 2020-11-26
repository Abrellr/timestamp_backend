const client = require("../database/client");

module.exports = {
  checkUser: (req, res, next) => {
    const { user_id } = req.params;
    client
      .query("SELECT * FROM users WHERE user_id=$1", [user_id])
      .then((data) => {
        if (!data.rows[0]) return res.sendStatus(404);
        req.user = data.rows[0];
        next();
      })
      .catch((e) => console.log(e));
  }
};