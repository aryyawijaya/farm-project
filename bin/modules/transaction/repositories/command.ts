import { QueryConfig } from 'pg';
import PostgreSQL from '../../../databases/postgresql/db';
import { Moment } from 'moment';

class Command {
  private pg: PostgreSQL;
  constructor(pg: PostgreSQL) {
    this.pg = pg;
  }

  async inputTransaction(
    inputtedBy: number,
    volume: number,
    buyer: string,
    price: number,
    date: Moment,
    createdAt: Moment,
  ) {
    const query: QueryConfig = {
      text: 'INSERT INTO public.transaction("inputtedBy", volume, buyer, price, date, "createdAt") VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
      values: [inputtedBy, volume, buyer, price, date, createdAt],
    };
    return await this.pg.query(query);
  }
}

export default Command;
