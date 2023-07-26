import { PoolClient, QueryConfig } from 'pg';
import { pool } from './connection';

class PostgreSQL {
  async query(query: QueryConfig) {
    const scope = 'execute';

    let client: PoolClient;
    try {
      client = await pool.connect();
    } catch (error) {
      console.error(
        `ERROR: Cannot connect to PostgreSQL; REASON: ${error}; SCOPE: ${scope}`,
      );
      throw 'Cannot connect to PostgreSQL';
    }

    try {
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.error(`ERROR: Cannot execute query; REASON: ${error}`);
      throw 'Cannot execute query';
    } finally {
      client.release();
    }
  }
}

export default PostgreSQL;
