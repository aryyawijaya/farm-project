import { NextFunction, Request, Response } from 'express';
import { Secret, verify } from 'jsonwebtoken';
import configs from '../config';
import { AuthenticatedRequest, DecodedUser } from '../helpers/common_types';

const { ACCESS_TOKEN_SECRET } = configs.jwt;

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  const scope = 'verifyJwt';
  const authHeader = req.headers.authorization;
  const accessToken = authHeader && authHeader.split(' ')[1];

  if (!accessToken) {
    return res.status(401).send({
      ok: false,
      status: 401,
      message: 'Token not found',
      data: {},
    });
  }

  try {
    const user = verify(
      accessToken,
      ACCESS_TOKEN_SECRET as Secret,
    ) as DecodedUser;
    (req as AuthenticatedRequest).user = user;
    next();
  } catch (error) {
    console.error(`ERROR; REASON: ${error}; SCOPE: ${scope}`);
    return res.status(403).send({
      ok: false,
      status: 403,
      message: 'Invalid token',
      data: {},
    });
  }
};

export const isOwner = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.user?.role !== 'OWNER') {
    return res.status(403).send({
      ok: false,
      status: 403,
      message: 'You have not access to this resource',
      data: {},
    });
  }
  next();
};

export const isCattleman = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.user?.role !== 'CATTLEMAN') {
    return res.status(403).send({
      ok: false,
      status: 403,
      message: 'You have not access to this resource',
      data: {},
    });
  }
  next();
};
