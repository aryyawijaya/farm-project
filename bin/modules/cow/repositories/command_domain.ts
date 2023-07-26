import moment from 'moment';
import PostgreSQL from '../../../databases/postgresql/db';
import Command from './command';
import { AddedCow, PayloadAddCow } from './command_model';

class CowCommand {
  private command: Command;
  constructor(pg: PostgreSQL) {
    this.command = new Command(pg);
  }

  async add(payload: PayloadAddCow) {
    const { createdBy, updatedBy, name, birthday, deadday, weight } = payload;
    const createdAt = moment();
    const updatedAt = createdAt;
    const addedCow: AddedCow = (
      await this.command.addCow(
        createdBy,
        updatedBy,
        name,
        birthday,
        deadday,
        weight,
        createdAt,
        updatedAt,
      )
    )[0];
    return {
      ok: true,
      status: 201,
      message: 'Success add new cow',
      data: addedCow,
    };
  }
}

export default CowCommand;
