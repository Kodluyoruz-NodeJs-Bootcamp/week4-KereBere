import express from 'express';
const router = express.Router();
import { register, login, logout } from '../controllers/authController';
import { body, CustomValidator } from 'express-validator';
import { User } from '../entity/User';
import {
  registerValidation,
  bodyValidation,
} from '../middlewares/registerValidation';
import { getRepository } from 'typeorm';

router.route('/register').post(bodyValidation, registerValidation, register);
router.post('/login', login);
router.route('/logout').get(logout);

export default router;
// body('password2')
// .not()
// .isEmpty()
// .custom(async (value, { req }) => {
//   console.log(req.body);
//   console.log(value);
//   const password = req.body.password;
//   if (password !== value) {
//     console.log('edwe');
//     throw new Error('Password confirmation does not match password');
//   }
// }),
