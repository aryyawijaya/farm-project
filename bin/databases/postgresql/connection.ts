import { Pool } from 'pg';
import configs from '../../config';

const { HOST, USER, DATABASE, PASSWORD, PORT } = configs.postgres;

export const pool = new Pool({
  user: USER,
  host: HOST,
  database: DATABASE,
  password: PASSWORD,
  port: Number(PORT),
});

export const pgInit = async () => {
  const scope = 'pgInit';
  try {
    const client = await pool.connect();
    console.info('INFO: PostgreSQL connected successfully');
    client.release();
  } catch (error) {
    console.error(
      `ERROR: Cannot connect to PostgreSQL; REASON: ${error}; SCOPE: ${scope}`,
    );
    throw error;
  }
};
