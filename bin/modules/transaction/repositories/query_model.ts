import Joi from 'joi';
import { Moment } from 'moment';

export type PayloadGetTransactionADay = {
  date: Moment;
};

export const getTransactionADaySchema = Joi.object({
  date: Joi.date().required(),
});
