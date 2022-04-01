const query = require('../query');

module.exports = async (req, res) => {
  try {
    let sql = `SELECT name, password FROM user WHERE name = '${req.body.username}' AND password = '${req.body.password}'`;
    const user = await query(sql);
    console.log(user);
    if (user) {
      req.session.loggedIn = true;
      req.session.userID = user.id;
      res.status(200).redirect('/');
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
