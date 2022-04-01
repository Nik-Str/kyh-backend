module.exports = async (req, res) => {
  if (req.session.loggedIn === true) {
    res.status(200).json({ message: 'User is logged in!' });
  } else {
    res.status(404).json({ message: 'User is not logged in' });
  }
};
