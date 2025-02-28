import pg from 'pg'
import "dotenv/config"
const { Client, Pool } = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    max: 20
});

pool.on('error', (err, client) => {
    console.error('unexpected error on idle client', err)
    process.exit(-1)
})

pool.connect((err, connection) => {
    if (err) throw err;
    console.log('database connected succesfully');
    connection.release();
})

export default pool;



