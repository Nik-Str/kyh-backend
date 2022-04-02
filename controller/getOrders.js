const query = require('../service/query');

module.exports = async (req, res) => {
  try {
    let sql = `SELECT user.name, products.description, userproducts.amount FROM user JOIN userproducts ON user.id = userproducts.userId JOIN products ON productId = products.id`;
    const data = await query(sql);

    const object = {};

    data.forEach((item) => {
      if (!object[item.name]) {
        object[item.name] = {};
      }
      object[item.name][item.description] = item.amount;
    });

    res.status(200).json({ data: object });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
