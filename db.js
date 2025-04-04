// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'filemonitor',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Prueba la conexión
pool.getConnection()
    .then(connection => {
        console.log('Conectado a la base de datos.');
        connection.release();
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos:', err);
    });

module.exports = pool;