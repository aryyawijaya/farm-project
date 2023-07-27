import { Response } from 'express';
import PostgreSQL from '../../../databases/postgresql/db';
import { AuthenticatedRequest } from '../../../helpers/common_types';
import { validatePayload } from '../../../utils/validator';
import {
  PayloadInputMilk,
  inputMilkSchema,
} from '../repositories/command_model';
import {
  PayloadGetMilkADay,
  getMilkADaySchema,
} from '../repositories/query_model';
import MilkProductionCommand from '../repositories/command_domain';
import MilkProductionQuery from '../repositories/query_domain';

const pg = new PostgreSQL();
const milkProductionCommand = new MilkProductionCommand(pg);
const milkProductionQuery = new MilkProductionQuery(pg);

export const inputMilk = async (req: AuthenticatedRequest, res: Response) => {
  const scope = 'inputMilk';

  const payload: PayloadInputMilk = {
    producedBy: req.body.producedBy,
    inputtedBy: req.user?.data.id,
    volume: req.body.volume,
  };
  let validatedPayload: PayloadInputMilk;
  try {
    validatedPayload = validatePayload(payload, inputMilkSchema);
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
    const result = await milkProductionCommand.input(validatedPayload);
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

export const getMilkADay = async (req: AuthenticatedRequest, res: Response) => {
  const scope = 'getMilkADay';

  const payload: PayloadGetMilkADay = {
    date: req.body.date,
  };
  let validatedPayload: PayloadGetMilkADay;
  try {
    validatedPayload = validatePayload(payload, getMilkADaySchema);
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
    const result = await milkProductionQuery.getADay(validatedPayload);
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
