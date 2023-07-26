import { QueryConfig } from 'pg';
import PostgreSQL from '../../../databases/postgresql/db';

class Query {
  private pg: PostgreSQL;
  constructor(pg: PostgreSQL) {
    this.pg = pg;
  }

  async findCattlemanByUsername(username: string) {
    const query: QueryConfig = {
      text: 'SELECT * FROM public.cattleman WHERE username=$1',
      values: [username],
    };
    return await this.pg.query(query);
  }
}

export default Query;
