import moment from 'moment';
import PostgreSQL from '../../../databases/postgresql/db';
import Command from './command';
import { PayloadRegisterCattleman, RegisteredCattleman } from './command_model';
import { hash } from 'bcrypt';
import configs from '../../../config';

const { SALT_ROUNDS } = configs.hash;

class Cattleman {
  private command: Command;
  constructor(pg: PostgreSQL) {
    this.command = new Command(pg);
  }

  async register(payload: PayloadRegisterCattleman) {
    const { createdBy, name, username, password } = payload;
    const hashedPass = await hash(password, Number(SALT_ROUNDS));
    const createdAt = moment();
    const registeredCattleman: RegisteredCattleman = (
      await this.command.createCattleman(
        createdBy,
        name,
        username,
        hashedPass,
        createdAt,
      )
    )[0];
    return {
      ok: true,
      status: 201,
      message: 'Success register new cattleman',
      data: {
        id: registeredCattleman.id,
        createdBy: registeredCattleman.createdBy,
        name: registeredCattleman.name,
        username: registeredCattleman.username,
        password: registeredCattleman.password,
        createdAt: registeredCattleman.createdAt,
      },
    };
  }
}

export default Cattleman;
