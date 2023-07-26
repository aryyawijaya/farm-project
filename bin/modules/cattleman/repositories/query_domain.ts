import PostgreSQL from '../../../databases/postgresql/db';
import { compare } from 'bcrypt';
import Query from './query';
import { PayloadLoginCattleman } from './query_model';
import { isEmpty } from 'lodash';
import { RegisteredCattleman } from './command_model';
import { generateAccessToken } from '../../../auth/jwt';

class CattlemanQuery {
  private query: Query;
  constructor(pg: PostgreSQL) {
    this.query = new Query(pg);
  }

  async login(payload: PayloadLoginCattleman) {
    const { username, password } = payload;
    const foundCattleman: RegisteredCattleman = (
      await this.query.findCattlemanByUsername(username)
    )[0];
    if (
      isEmpty(foundCattleman) ||
      !(await compare(password, foundCattleman.password))
    ) {
      console.info(`INFO: Unauthorized client`);
      return {
        ok: false,
        status: 401,
        message: 'Username or password is not valid',
        data: {},
      };
    }
    const payloadToken = {
      role: 'CATTLEMAN',
      data: {
        id: foundCattleman.id,
        name: foundCattleman.name,
        username: foundCattleman.username,
      },
    };
    const accessToken = generateAccessToken(payloadToken);
    return {
      ok: true,
      status: 200,
      message: 'Success login cattleman',
      data: {
        accessToken: accessToken,
      },
    };
  }
}

export default CattlemanQuery;
