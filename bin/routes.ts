import { Router } from 'express';
import * as cattlemanHanlder from './modules/cattleman/handlers/api_handler';
import * as ownerHanlder from './modules/owner/handlers/api_handler';
import { isOwner, verifyJwt } from './middlewares/auth';

const router = Router();

router.post('/owner/v1/login', ownerHanlder.loginOwner);
router.post(
  '/cattleman/v1/register',
  verifyJwt,
  isOwner,
  cattlemanHanlder.registerCattleman,
);

export default router;
