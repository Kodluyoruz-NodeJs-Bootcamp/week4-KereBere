import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { RequestHandler } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import UserController from './UserController';

//* JWT token - 3 days
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id: string) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: '15s',
  });
};
export const register: RequestHandler = async (req, res) => {
  try {
    UserController.newUser(req.body);
    //* httpOnly: true add to cookie for security
    // res.cookie('jwt', token);
    req.flash('success', 'Register successfull, please sign in.');
    // req.session.userID = '';
    res.status(201).redirect('/login');
  } catch (err) {
    res.status(400).redirect('/register');
  }
};
export const login: RequestHandler = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    UserController.getOneByEmail(email)
      .then((user) => {
        console.log('user DB' + password);
        if (user) {
          bcrypt.compare(password, user.password, (err, same) => {
            console.log(same);
            if (same) {
              console.log(same);
              req.session.userID = user.id;
              const token = createToken(user.id);
              //* httpOnly: true add to cookie for security
              res.cookie('jwt', token);
              // req.session.token = token; çok uzun bd düzenle
              res.status(200).redirect('/');
            } else {
              req.flash('error', 'Wrong Password');
              res.status(400).redirect('/login');
            }
          });
        }
      })
      .catch((err) => {
        req.flash('error', 'User does not exist');
        res.status(400).redirect('/login');
      });
  } catch (err) {
    req.flash('error', err.msg);
    res.status(400).redirect('/login');
  }
};

export const logout: RequestHandler = (req, res) => {
  req.session.destroy(() => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/login');
  });
};
