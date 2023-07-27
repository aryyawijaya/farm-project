import moment from 'moment';
import PostgreSQL from '../../../databases/postgresql/db';
import Query from './query';
import { PayloadGetMilkADay } from './query_model';

class MilkProductionQuery {
  private query: Query;
  constructor(pg: PostgreSQL) {
    this.query = new Query(pg);
  }

  async getADay(payload: PayloadGetMilkADay) {
    const { date } = payload;
    const sDate = moment(date).format('YYYY-MM-DD');
    const foundMilkProd = await this.query.findMilkByDay(sDate);
    return {
      ok: true,
      status: 200,
      message: 'Success get milk production in a day',
      data: { milkProductions: foundMilkProd },
    };
  }
}

export default MilkProductionQuery;
