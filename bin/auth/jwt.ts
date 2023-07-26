import { Secret, sign } from 'jsonwebtoken';
import configs from '../config';

const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRES } = configs.jwt;

export const generateAccessToken = (payload: any) => {
  const scope = 'generateAccessToken';
  try {
    const token = sign(payload, ACCESS_TOKEN_SECRET as Secret, {
      expiresIn: Number(ACCESS_TOKEN_EXPIRES),
    });
    return token;
  } catch (error) {
    console.error(
      `ERROR: Cannot generate JWT access token; REASON: ${error}; SCOPE: ${scope}`,
    );
    throw `Cannot generate JWT access token`;
  }
};
