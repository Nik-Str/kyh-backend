const query = require('../service/query');
const getBody = require('../service/getBody');

module.exports = async (req, res) => {
  const body = await getBody(req);

  try {
    const sql = `DELETE FROM products WHERE products.description = '${body.product}'`;
    const data = await query(sql);

    if (data) {
      res.status(200).end();
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
