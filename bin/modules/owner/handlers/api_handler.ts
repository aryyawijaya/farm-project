import { Request, Response } from 'express';
import {
  PayloadLoginOwner,
  loginOwnerSchema,
} from '../repositories/query_model';
import { validatePayload } from '../../../utils/validator';
import PostgreSQL from '../../../databases/postgresql/db';
import OwnerQuery from '../repositories/query_domain';

const pg = new PostgreSQL();
const ownerQuery = new OwnerQuery(pg);

export const loginOwner = async (req: Request, res: Response) => {
  const scope = 'loginOwner';

  const payload: PayloadLoginOwner = {
    email: req.body.email,
    password: req.body.password,
  };
  let validatedPayload: PayloadLoginOwner;
  try {
    validatedPayload = validatePayload(payload, loginOwnerSchema);
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
    const result = await ownerQuery.login(validatedPayload);
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
