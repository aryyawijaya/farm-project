import { Schema } from 'joi';
import { isEmpty } from 'lodash';

export const validatePayload = (payload: any, schema: Schema) => {
  const { error, value } = schema.validate(payload);
  if (!isEmpty(error)) {
    throw `Payload not valid. Error: ${error.details[0].message}`;
  }
  return value;
};
