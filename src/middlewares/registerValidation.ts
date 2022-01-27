import { RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

export const registerValidation: RequestHandler = async (req, res, next) => {
  const errors: Array<String> = validationResult(req)
    .array()
    .map((error) => error.msg);

  errors.length > 0 ? res.render('register', { errors }) : next();
};

export const bodyValidation = [
  body('name').not().isEmpty().withMessage('Please enter your name'),
  body('username').not().isEmpty().withMessage('Please enter your username'),
  body('email')
    .isEmail()
    .withMessage('Please enter your email')
    .custom(
      async (useremail) =>
        await getRepository(User)
          .findOne({
            email: useremail,
          })
          .then((user) => {
            if (user) {
              console.log(user);
              return Promise.reject('E-mail already in use');
            }
            return user;
          })
    ),
  body('password')
    .not()
    .isEmpty()

    .custom((password, { req }) => {
      if (password !== req.body.password2) {
        console.log('edwe');
        throw new Error('Password confirmation does not match password');
      }
      return password;
    }),
];
