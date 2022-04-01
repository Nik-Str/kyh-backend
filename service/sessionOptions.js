const port = process.env.PORT || 3000;

//SESSION OPTIONS
const options = {
  host: process.env.DB_HOST,
  port: port,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_BASE,
  clearExpired: true,
  checkExpirationInterval: 900000,
  expiration: 86400000,
  createDatabaseTable: true,
  connectionLimit: 1,
  endConnectionOnClose: true,
  charset: 'utf8mb4_bin',
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data',
    },
  },
};

module.exports = options;
