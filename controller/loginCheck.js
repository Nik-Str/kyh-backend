const query = require('../service/query');

module.exports = async (req, res) => {
  try {
    let sql = `SELECT * FROM user WHERE name = '${req.body.username}' AND password = '${req.body.password}'`;
    const user = await query(sql);

    if (user) {
      req.session.loggedIn = true;
      req.session.userId = user[0].id;

      req.session.save(function (err) {
        res.status(200).redirect('/');
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).redirect('/login');
  }
};
