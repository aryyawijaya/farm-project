import { QueryConfig } from 'pg';
import PostgreSQL from '../../../databases/postgresql/db';
import { Moment } from 'moment';

class Command {
  private pg: PostgreSQL;
  constructor(pg: PostgreSQL) {
    this.pg = pg;
  }

  async addCow(
    createdBy: number,
    updatedBy: number,
    name: string,
    birthday: Moment,
    deadday: Moment,
    weight: number,
    createdAt: Moment,
    updatedAt: Moment,
  ) {
    const query: QueryConfig = {
      text: 'INSERT INTO public.cow("createdBy", "updatedBy", name, birthday, deadday, weight, "createdAt", "updatedAt") VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      values: [
        createdBy,
        updatedBy,
        name,
        birthday,
        deadday,
        weight,
        createdAt,
        updatedAt,
      ],
    };
    return await this.pg.query(query);
  }
}

export default Command;
