import Joi from 'joi';

export type PayloadLoginCattleman = {
  username: string;
  password: string;
};

export const loginCattlemanSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
