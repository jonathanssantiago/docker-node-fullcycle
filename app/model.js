const mysql = require('mysql');
const { promisify } = require('util');

const pool = mysql.createConnection({
  host: 'database',
  user: 'root',
  password: 'root',
  database: 'nodedb',
});

const queryAsync = promisify(pool.query).bind(pool);

async function Raw(sql) {
  try {
    const results = await queryAsync(sql);
    return results;
  } catch (error) {
    throw error;
  }
}

const db = {
  Raw,
};

module.exports = { db };
