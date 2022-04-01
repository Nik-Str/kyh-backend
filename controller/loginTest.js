module.exports = async (req, res) => {
  try {
    if (req.body.test === 'login') {
      req.session.loggedIn = true;
    }

    res.status(200).json({ message: 'loged succes!' });
  } catch (err) {
    res.status(404).end();
  }
};
