import Joi from 'joi';
import { Moment } from 'moment';

export type PayloadInputTransaction = {
  inputtedBy: number;
  volume: number;
  buyer: string;
  price: number;
  date: Moment;
};

export const inputTransactionSchema = Joi.object({
  inputtedBy: Joi.number().required(),
  volume: Joi.number().required(),
  buyer: Joi.string().optional().default(null),
  price: Joi.number().required(),
  date: Joi.date().required(),
});
