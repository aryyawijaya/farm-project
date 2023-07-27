import moment from 'moment';
import PostgreSQL from '../../../databases/postgresql/db';
import Query from './query';
import { PayloadGetTransactionADay } from './query_model';

class TransactionQuery {
  private query: Query;
  constructor(pg: PostgreSQL) {
    this.query = new Query(pg);
  }

  async getADay(payload: PayloadGetTransactionADay) {
    const { date } = payload;
    const sDate = moment(date).format('YYYY-MM-DD');
    const foundTransactions = await this.query.findTransactionsByDay(sDate);
    return {
      ok: true,
      status: 200,
      message: 'Success get transactin in a day',
      data: { transactions: foundTransactions },
    };
  }
}

export default TransactionQuery;
