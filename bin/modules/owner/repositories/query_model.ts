import Joi from 'joi';

export type PayloadLoginOwner = {
  email: string;
  password: string;
};

export const loginOwnerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export type OwnerType = {
  id: string;
  name: string;
  email: string;
  password: string;
};
