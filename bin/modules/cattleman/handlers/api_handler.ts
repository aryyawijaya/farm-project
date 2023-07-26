import { Response } from 'express';
import {
  PayloadRegisterCattleman,
  registerCattlemanSchema,
} from '../repositories/command_model';
import { validatePayload } from '../../../utils/validator';
import PostgreSQL from '../../../databases/postgresql/db';
import CattlemanCommand from '../repositories/command_domain';
import { AuthenticatedRequest } from '../../../helpers/common_types';

const pg = new PostgreSQL();
const cattlemanCommand = new CattlemanCommand(pg);

export const registerCattleman = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const scope = 'registerCattleman';

  const payload: PayloadRegisterCattleman = {
    createdBy: req.user?.data.id,
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
  };
  let validatedPayload: PayloadRegisterCattleman;
  try {
    validatedPayload = validatePayload(payload, registerCattlemanSchema);
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
    const result = await cattlemanCommand.register(validatedPayload);
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
