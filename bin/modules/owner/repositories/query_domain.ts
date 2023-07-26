import { isEmpty } from 'lodash';
import PostgreSQL from '../../../databases/postgresql/db';
import Query from './query';
import { OwnerType, PayloadLoginOwner } from './query_model';
import { generateAccessToken } from '../../../auth/jwt';
import { compare } from 'bcrypt';

class OwnerQuery {
  private query: Query;
  constructor(pg: PostgreSQL) {
    this.query = new Query(pg);
  }

  async login(payload: PayloadLoginOwner) {
    const { email, password } = payload;
    const foundOwner: OwnerType = (await this.query.findOwnerByEmail(email))[0];
    if (
      isEmpty(foundOwner) ||
      !(await compare(password, foundOwner.password))
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
      role: 'OWNER',
      data: {
        id: foundOwner.id,
        name: foundOwner.name,
        email: foundOwner.email,
      },
    };
    const accessToken = generateAccessToken(payloadToken);
    return {
      ok: true,
      status: 200,
      message: 'Success login owner',
      data: {
        accessToken: accessToken,
      },
    };
  }
}

export default OwnerQuery;
