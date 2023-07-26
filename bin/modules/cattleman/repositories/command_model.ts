import Joi from 'joi';
import { Moment } from 'moment';

export type PayloadRegisterCattleman = {
  createdBy: number;
  name: string;
  username: string;
  password: string;
};

export const registerCattlemanSchema = Joi.object({
  createdBy: Joi.number().required(),
  name: Joi.string().optional().default(null),
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export interface RegisteredCattleman extends PayloadRegisterCattleman {
  id: number;
  createdAt: Moment;
}
