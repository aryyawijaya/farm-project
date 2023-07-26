import { QueryConfig } from 'pg';
import PostgreSQL from '../../../databases/postgresql/db';
import { Moment } from 'moment';

class Command {
  private pg: PostgreSQL;
  constructor(pg: PostgreSQL) {
    this.pg = pg;
  }

  async createCattleman(
    createdBy: number,
    name: string,
    username: string,
    password: string,
    createdAt: Moment,
  ) {
    const query: QueryConfig = {
      text: 'INSERT INTO public.cattleman("createdBy", name, username, password, "createdAt") VALUES($1, $2, $3, $4, $5) RETURNING *',
      values: [createdBy, name, username, password, createdAt],
    };
    return await this.pg.query(query);
  }
}

export default Command;
