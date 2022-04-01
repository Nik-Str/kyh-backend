const pool = require('./dbConnection');

module.exports = async (sql) => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, con) {
      if (err) throw err;
      con.query(sql, (err, result) => {
        if (err) reject(err);
        con.release();
        resolve(result);
      });
    });
  });
};
