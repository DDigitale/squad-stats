import mysql from 'mysql2/promise';
import config from '../config.json';

interface Options {
    query: string;
    values?: any[];
}


const pool = mysql.createPool({
    host: config.db_host,
    port: config.db_port,
    user: config.db_user,
    password: config.db_password,
    database: config.db_database
})

export const sql = async ({query, values}: Options) => {
    const [rows] = await pool.query(query, values);

    return rows;

}
