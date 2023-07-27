import { QueryConfig } from 'pg';
import PostgreSQL from '../../../databases/postgresql/db';
import { Moment } from 'moment';

class Command {
  private pg: PostgreSQL;
  constructor(pg: PostgreSQL) {
    this.pg = pg;
  }

  async inputMilk(
    producedBy: number,
    inputtedBy: number,
    inputDate: Moment,
    volume: number,
  ) {
    const query: QueryConfig = {
      text: 'INSERT INTO public."milkProduction"("producedBy", "inputtedBy", "inputDate", volume) VALUES($1, $2, $3, $4) RETURNING *',
      values: [producedBy, inputtedBy, inputDate, volume],
    };
    return await this.pg.query(query);
  }
}

export default Command;
