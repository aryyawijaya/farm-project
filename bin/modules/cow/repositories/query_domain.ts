import PostgreSQL from '../../../databases/postgresql/db';
import Query from './query';

class CowQuery {
  private query: Query;
  constructor(pg: PostgreSQL) {
    this.query = new Query(pg);
  }

  async getAll() {
    const allCow = await this.query.findAllCow();
    return {
      ok: true,
      status: 200,
      message: 'Success find all cow',
      data: {
        cows: allCow,
      },
    };
  }
}

export default CowQuery;
