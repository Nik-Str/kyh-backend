const pool = require('../dbConnection');

module.exports = async (req, res) => {
  
  try{

    pool.getConnection(function (err, con) {
      if (err) throw err;
  
      //Hämta id på de ämnen som har trådar ur forum
      function getSubID(){
        return new Promise((resolve) => {
          let sql = 'SELECT * FROM subject WHERE active = "Active"';
          con.query(sql, (err, result) => {
            if (err) throw err;
            con.release();
            resolve(result);
          });
        });
      }

  } catch(err) {
    console.log(err);
    res.status(500).end();
  }

};
