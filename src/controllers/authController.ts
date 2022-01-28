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
    req.flash('success', 'Register successfull, please sign in.');
    res.status(201).redirect('/login');
  } catch (err) {
    res.status(400).redirect('/register');
  }
};
export const login: RequestHandler = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    if (!(email && password)) {
      req.flash('error', 'Please enter your mail & password');
      res.status(400).redirect('/login');
    }
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { email } });
    } catch (error) {
      req.flash('error', 'User does not exist');
      res.status(400).redirect('/login');
      return;
    }
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      req.flash('error', 'Incorrect password');
      res.status(400).redirect('/login');
      return;
    }

    const browserInfo = req.headers['user-agent'];
    //   //* httpOnly: true add to cookie for security
    const token = jwt.sign(
      { userId: user.email, browserInfo: browserInfo },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    );

    res.cookie('jwt', token);
    req.flash('success', 'Login successfull');
    req.session.token = token;
    console.log(token);
    res.status(200).redirect('/');
  } catch (err) {
    req.flash('error', 'Login Failed');
    res.status(400).redirect('/login');
  }
};

export const logout: RequestHandler = (req, res) => {
  req.session.destroy(() => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/login');
  });
};
