const query = require('../service/query');

module.exports = async (req, res) => {
  try {
    let sql = `INSERT INTO user SET name = '${req.body.username}', contact = '${req.body.contact}', password = '${req.body.password}'`;
    const user = await query(sql);

    if (user) {
      res.status(201).redirect('/login');
    }
  } catch (err) {}
};
