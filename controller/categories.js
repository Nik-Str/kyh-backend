const query = require('../service/query');

module.exports = async (req, res) => {
  try {
    const sql = `Select id, description FROM products WHERE categorieId = (SELECT id FROM categories WHERE name = '${req.params.id}');`;
    const data = await query(sql);

    if (data) {
      res.status(200).json({ data: data });
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
