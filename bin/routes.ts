import { Router } from 'express';
import * as cattlemanHanlder from './modules/cattleman/handlers/api_handler';
import * as ownerHanlder from './modules/owner/handlers/api_handler';
import * as cowHandler from './modules/cow/handlers/api_handler';
import * as milkProductionHanlder from './modules/milk-production/handlers/api_handler';
import * as transactionHandler from './modules/transaction/handlers/api_handler';
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
router.delete('/cow/v1/delete/:id', verifyJwt, isOwner, cowHandler.deleteCow);
router.get('/cow/v1', verifyJwt, cowHandler.getAllCow);
router.post(
  '/milk-production/v1/input',
  verifyJwt,
  isCattleman,
  milkProductionHanlder.inputMilk,
);
router.get('/milk-production/v1', verifyJwt, milkProductionHanlder.getMilkADay);
router.post(
  '/transaction/v1/input',
  verifyJwt,
  isCattleman,
  transactionHandler.inputTransaction,
);
router.get('/transaction/v1', verifyJwt, transactionHandler.getTransactionADay);

export default router;
