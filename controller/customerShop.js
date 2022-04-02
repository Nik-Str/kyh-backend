const query = require('../service/query');

module.exports = async (req, res) => {
  try {
    const sql = `SELECT products.description, products.id, userProducts.amount FROM products JOIN userProducts ON products.id = userProducts.productId WHERE userId = ${req.session.userId}`;
    const cart = await query(sql);

    const sql2 = 'SELECT name FROM categories';
    const data = await query(sql2);

    if (cart && data) {
      res.status(200).json({ cart: cart, data: data });
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
