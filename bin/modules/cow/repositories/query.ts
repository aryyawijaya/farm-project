import { QueryConfig } from 'pg';
import PostgreSQL from '../../../databases/postgresql/db';

class Query {
  private pg: PostgreSQL;
  constructor(pg: PostgreSQL) {
    this.pg = pg;
  }

  async findAllCow() {
    const query: QueryConfig = {
      text: 'SELECT * FROM public.cow',
    };
    return await this.pg.query(query);
  }
}

export default Query;
