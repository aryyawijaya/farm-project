import Joi from 'joi';

export type PayloadInputMilk = {
  producedBy: number;
  inputtedBy: number;
  volume: number;
};

export const inputMilkSchema = Joi.object({
  producedBy: Joi.number().required(),
  inputtedBy: Joi.number().required(),
  volume: Joi.number().required(),
});
