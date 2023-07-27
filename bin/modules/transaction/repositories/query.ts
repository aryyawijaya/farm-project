import { QueryConfig } from 'pg';
import PostgreSQL from '../../../databases/postgresql/db';

class Query {
  private pg: PostgreSQL;
  constructor(pg: PostgreSQL) {
    this.pg = pg;
  }

  async findTransactionsByDay(date: string) {
    const query: QueryConfig = {
      text: `SELECT * FROM public.transaction WHERE "date"::date = $1`,
      values: [date],
    };
    return await this.pg.query(query);
  }
}

export default Query;
