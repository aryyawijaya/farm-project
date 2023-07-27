import moment from 'moment';
import PostgreSQL from '../../../databases/postgresql/db';
import Command from './command';
import { PayloadInputTransaction } from './command_model';

class TransactionCommand {
  private command: Command;
  constructor(pg: PostgreSQL) {
    this.command = new Command(pg);
  }

  async input(payload: PayloadInputTransaction) {
    const { inputtedBy, volume, buyer, price, date } = payload;
    const createdAt = moment();
    const inputted = (
      await this.command.inputTransaction(
        inputtedBy,
        volume,
        buyer,
        price,
        date,
        createdAt,
      )
    )[0];
    return {
      ok: true,
      status: 201,
      message: 'Success input new transaction',
      data: inputted,
    };
  }
}

export default TransactionCommand;
