const query = require('../service/query');
const getBody = require('../service/getBody');

module.exports = async (req, res) => {
  try {
    const body = await getBody(req);

    const sql = `DELETE FROM userproducts WHERE userId = ${req.session.userId} AND productId = ${body.product}`;
    const data = await query(sql);

    if (data) res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
