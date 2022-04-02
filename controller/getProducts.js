const query = require('../service/query');

module.exports = async (req, res) => {
  try {
    let sql = `SELECT categories.name, products.description FROM categories LEFT JOIN products ON categories.id = products.categorieId`;
    const data = await query(sql);

    const object = {};

    data.forEach((item) => {
      if (!object[item.name]) {
        object[item.name] = [];
      }
      object[item.name].push(item.description);
    });

    res.status(200).json({ data: object });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
