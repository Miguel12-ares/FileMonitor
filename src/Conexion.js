const { Pool } = require('pg'); // o cualquier otro cliente de base de datos que estés usando

const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'filemonitor',
  password: '',
  port: 5432,
});

async function loginUser(email, password) {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
    return res.rows[0];
  } finally {
    client.release();
  }
}

async function registerUser(id, username, email, password) {
  const client = await pool.connect();
  try {
    const res = await client.query(
      'INSERT INTO users (id, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [id, username, email, password]
    );
    return res.rows[0];
  } finally {
    client.release();
  }
}

module.exports = { loginUser, registerUser };