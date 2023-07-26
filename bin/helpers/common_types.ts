import { Request } from 'express';

export type DecodedUser = {
  role: string;
  data: any;
  iat: number;
  exp: number;
};

export interface AuthenticatedRequest extends Request {
  user?: DecodedUser;
}
