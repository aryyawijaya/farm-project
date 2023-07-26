import moment from 'moment';
import PostgreSQL from '../../../databases/postgresql/db';
import Command from './command';
import {
  AddedCow,
  PayloadAddCow,
  PayloadDeleteCow,
  PayloadEditCow,
} from './command_model';

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

  async edit(payload: PayloadEditCow) {
    const { id, updatedBy, name, birthday, deadday, weight } = payload;
    const updatedAt = moment();
    const editedCow = (
      await this.command.editCow(
        id,
        updatedBy,
        name,
        birthday,
        deadday,
        weight,
        updatedAt,
      )
    )[0];
    return {
      ok: true,
      status: 200,
      message: 'Success edit a cow',
      data: editedCow,
    };
  }

  async delete(payload: PayloadDeleteCow) {
    const { id } = payload;
    const deletedCow = (await this.command.deleteCow(id))[0];
    return {
      ok: true,
      status: 200,
      message: 'Success deleted a cow',
      data: deletedCow,
    };
  }

  async getAll() {
    const allCow = await this.command.findAllCow();
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

export default CowCommand;
