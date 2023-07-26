import { Router } from 'express';
import * as cattlemanHanlder from './modules/cattleman/handlers/api_handler';
import * as ownerHanlder from './modules/owner/handlers/api_handler';
import * as cowHandler from './modules/cow/handlers/api_handler';
import { isCattleman, isOwner, verifyJwt } from './middlewares/auth';

const router = Router();

router.post('/owner/v1/login', ownerHanlder.loginOwner);
router.post(
  '/cattleman/v1/register',
  verifyJwt,
  isOwner,
  cattlemanHanlder.registerCattleman,
);
router.post('/cattleman/v1/login', cattlemanHanlder.loginCattleman);
router.post('/cow/v1/add', verifyJwt, isCattleman, cowHandler.addCow);
router.put('/cow/v1/edit/:id', verifyJwt, isCattleman, cowHandler.editCow);

export default router;
