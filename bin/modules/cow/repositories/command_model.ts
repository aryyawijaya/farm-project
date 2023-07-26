import Joi from 'joi';
import { Moment } from 'moment';

export type PayloadAddCow = {
  createdBy: number;
  updatedBy: number;
  name: string;
  birthday: Moment;
  deadday: Moment;
  weight: number;
};

export const addCowSchema = Joi.object({
  createdBy: Joi.number().required(),
  updatedBy: Joi.number().required(),
  name: Joi.string().optional().default(null),
  birthday: Joi.date().optional().default(null),
  deadday: Joi.date().optional().default(null),
  weight: Joi.number().optional().default(null),
});

export interface AddedCow extends PayloadAddCow {
  createdAt: Moment;
  updatedAt: Moment;
}

export type PayloadEditCow = {
  id: number;
  updatedBy: number;
  name: string;
  birthday: Moment;
  deadday: Moment;
  weight: number;
};

export const editCowSchema = Joi.object({
  id: Joi.number().required(),
  updatedBy: Joi.number().required(),
  name: Joi.string().optional().default(null),
  birthday: Joi.date().optional().default(null),
  deadday: Joi.date().optional().default(null),
  weight: Joi.number().optional().default(null),
});
