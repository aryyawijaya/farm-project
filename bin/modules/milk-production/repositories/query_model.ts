import Joi from 'joi';
import { Moment } from 'moment';

export type PayloadGetMilkADay = {
  date: Moment;
};

export const getMilkADaySchema = Joi.object({
  date: Joi.date().required(),
});
