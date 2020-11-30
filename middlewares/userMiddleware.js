const client = require("../database/client");


exports.checkUser = (req, res, next) => {
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



exports.checkNewUser = (req, res, next) => {
    const { username } = req.body;
    client
      .query("SELECT * FROM users WHERE username=$1", [username])
      .then((data) => {
        if (data.rowCount !== 0) return res.send('this user already exists');
        next();
      })
        .catch((err) => console.log('checkNewUser goes bad'))
  }