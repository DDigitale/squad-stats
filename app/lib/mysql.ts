import {createConnection} from 'mysql2/promise';
import config from '../../config.json'

interface Options {
    query: string;
    values?: any[];
}

export const dbFunc = async ({query, values}: Options) => {
    try {
        const connection = await createConnection({
            host: config.db_host,
            port: config.db_port,
            user: config.db_user,
            password: config.db_password,
            database: config.db_database
        });

        const sql = async (query: string, values: any[] | undefined) => {
            const [rows] = await connection.query(query, values);

            return rows;
        }


        const result = await sql(query, values)

        await connection.end();
        return result
    } catch (e) {
        console.log(e)
    }
}


// https://www.mongodb.com/docs/manual/aggregation/
// cache redis