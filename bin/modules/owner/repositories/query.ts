import { QueryConfig } from 'pg';
import PostgreSQL from '../../../databases/postgresql/db';

class Query {
  private pg: PostgreSQL;
  constructor(pg: PostgreSQL) {
    this.pg = pg;
  }

  async findOwnerByEmail(email: string) {
    const query: QueryConfig = {
      text: 'SELECT * FROM public.owner WHERE email=$1',
      values: [email],
    };
    return await this.pg.query(query);
  }
}

export default Query;
