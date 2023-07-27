import { Response } from 'express';
import PostgreSQL from '../../../databases/postgresql/db';
import { AuthenticatedRequest } from '../../../helpers/common_types';
import { validatePayload } from '../../../utils/validator';
import {
  PayloadAddCow,
  PayloadDeleteCow,
  PayloadEditCow,
  addCowSchema,
  deleteCowSchema,
  editCowSchema,
} from '../repositories/command_model';
import CowCommand from '../repositories/command_domain';
import CowQuery from '../repositories/query_domain';

const pg = new PostgreSQL();
const cowCommand = new CowCommand(pg);
const cowQuery = new CowQuery(pg);

export const addCow = async (req: AuthenticatedRequest, res: Response) => {
  const scope = 'addCow';

  const payload: PayloadAddCow = {
    createdBy: req.user?.data.id,
    updatedBy: req.user?.data.id,
    name: req.body.name,
    birthday: req.body.birthday,
    deadday: req.body.deadday,
    weight: req.body.weight,
  };
  let validatedPayload: PayloadAddCow;
  try {
    validatedPayload = validatePayload(payload, addCowSchema);
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
    const result = await cowCommand.add(validatedPayload);
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

export const editCow = async (req: AuthenticatedRequest, res: Response) => {
  const scope = 'editCow';

  const payload: PayloadEditCow = {
    id: Number(req.params.id),
    updatedBy: req.user?.data.id,
    name: req.body.name,
    birthday: req.body.birthday,
    deadday: req.body.deadday,
    weight: req.body.weight,
  };
  let validatedPayload: PayloadEditCow;
  try {
    validatedPayload = validatePayload(payload, editCowSchema);
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
    const result = await cowCommand.edit(validatedPayload);
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

export const deleteCow = async (req: AuthenticatedRequest, res: Response) => {
  const scope = 'deleteCow';

  const payload: PayloadDeleteCow = {
    id: Number(req.params.id),
  };
  let validatedPayload: PayloadDeleteCow;
  try {
    validatedPayload = validatePayload(payload, deleteCowSchema);
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
    const result = await cowCommand.delete(validatedPayload);
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

export const getAllCow = async (req: AuthenticatedRequest, res: Response) => {
  const scope = 'getAllCow';

  try {
    const result = await cowQuery.getAll();
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
