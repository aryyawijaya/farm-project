import Joi from 'joi';

export type PayloadLoginOwner = {
  email: string;
  password: string;
};

export const loginOwnerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export interface OwnerType extends PayloadLoginOwner {
  id: string;
  name: string;
}
