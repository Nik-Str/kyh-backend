const query = require('../service/query');
const getBody = require('../service/getBody');

module.exports = async (req, res) => {
  const body = await getBody(req);

  try {
    const sql = `INSERT INTO categories SET name = '${body.category}'`;
    const data = await query(sql);

    if (data) {
      res.status(201).end();
    }
  } catch (err) {
    if (err.errno === 1062) {
      res.status(409).end();
    } else {
      res.status(500).end();
    }
  }
};
