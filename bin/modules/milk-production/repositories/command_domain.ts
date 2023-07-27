import moment from 'moment';
import PostgreSQL from '../../../databases/postgresql/db';
import Command from './command';
import { PayloadInputMilk } from './command_model';

class MilkProductionCommand {
  private command: Command;
  constructor(pg: PostgreSQL) {
    this.command = new Command(pg);
  }

  async input(payload: PayloadInputMilk) {
    const { producedBy, inputtedBy, volume } = payload;
    const inputDate = moment();
    const inputted = (
      await this.command.inputMilk(producedBy, inputtedBy, inputDate, volume)
    )[0];
    return {
      ok: true,
      status: 201,
      message: 'Success input new milk production',
      data: inputted,
    };
  }
}

export default MilkProductionCommand;
