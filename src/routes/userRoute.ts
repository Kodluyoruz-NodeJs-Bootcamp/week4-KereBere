import express from 'express';
const router = express.Router();
import { register, login, logout } from '../controllers/authController';
import {
  registerValidation,
  bodyValidation,
} from '../middlewares/registerValidation';

router.route('/register').post(bodyValidation, registerValidation, register);
router.post('/login', login);
router.route('/logout').get(logout);

export default router;
 
