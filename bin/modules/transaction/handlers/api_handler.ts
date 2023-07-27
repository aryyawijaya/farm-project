import { Response } from 'express';
import PostgreSQL from '../../../databases/postgresql/db';
import { AuthenticatedRequest } from '../../../helpers/common_types';
import { validatePayload } from '../../../utils/validator';
import {
  PayloadInputTransaction,
  inputTransactionSchema,
} from '../repositories/command_model';
import {
  PayloadGetTransactionADay,
  getTransactionADaySchema,
} from '../repositories/query_model';
import TransactionCommand from '../repositories/command_domain';
import TransactionQuery from '../repositories/query_domain';

const pg = new PostgreSQL();
const transactionCommand = new TransactionCommand(pg);
const transactionQuery = new TransactionQuery(pg);

export const inputTransaction = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const scope = 'inputTransaction';

  const payload: PayloadInputTransaction = {
    inputtedBy: req.user?.data.id,
    volume: req.body.volume,
    buyer: req.body.buyer,
    price: req.body.price,
    date: req.body.date,
  };
  let validatedPayload: PayloadInputTransaction;
  try {
    validatedPayload = validatePayload(payload, inputTransactionSchema);
  } catch (error) {
    console.error(`ERROR; REASON: ${error}; SCOPE: ${scope}`);
    return res.status(400).send({
      ok: false,
      status: 400,
      message: error,
      data: {},
    });
  }

  try {
    const result = await transactionCommand.input(validatedPayload);
    res.status(result.status).send(result);
  } catch (error) {
    console.error(`ERROR; REASON: ${error}; SCOPE: ${scope}`);
    res.status(500).send({
      ok: false,
      status: 500,
      message: error,
      data: {},
    });
  }
};

export const getTransactionADay = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const scope = 'getTransactionADay';

  const payload: PayloadGetTransactionADay = {
    date: req.body.date,
  };
  let validatedPayload: PayloadGetTransactionADay;
  try {
    validatedPayload = validatePayload(payload, getTransactionADaySchema);
  } catch (error) {
    console.error(`ERROR; REASON: ${error}; SCOPE: ${scope}`);
    return res.status(400).send({
      ok: false,
      status: 400,
      message: error,
      data: {},
    });
  }

  try {
    const result = await transactionQuery.getADay(validatedPayload);
    res.status(result.status).send(result);
  } catch (error) {
    console.error(`ERROR; REASON: ${error}; SCOPE: ${scope}`);
    res.status(500).send({
      ok: false,
      status: 500,
      message: error,
      data: {},
    });
  }
};
