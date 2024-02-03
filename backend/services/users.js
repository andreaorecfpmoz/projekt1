const db = require('./db');

async function getAllUsers() {
  const sql = `SELECT * FROM saloni`;
  return db.query(sql);
}

module.exports = {
  getAllUsers,
};
