const query = require('../service/query');
const getBody = require('../service/getBody');

module.exports = async (req, res) => {
  const body = await getBody(req);

  try {
    const sql = `INSERT INTO userProducts (userId, productId) VALUES (${req.session.userId}, ${body.product}) ON DUPLICATE KEY UPDATE amount = amount+1;`;
    const data = await query(sql);

    if (data) {
      res.status(201).end();
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
