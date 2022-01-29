import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { RequestHandler } from 'express';
import { User } from '../entity/User';
import UserController from './UserController';

export const register: RequestHandler = async (req, res) => {
  try {
    UserController.newUser(req.body);
    res.app.locals.created = true;
    res.status(200).redirect('/login');
  } catch (err) {
    res.status(400).redirect('/register');
  }
};
export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!(email && password)) {
      req.flash('error', 'Please enter your mail & password');
      res.status(400).redirect('/login');
    }
    let user: User;
    try {
      user = await User.findOneOrFail({ where: { email } });
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

    //* Add user & browser info to session
    const browserInfo = req.headers['user-agent'];
    req.session.browserInfo = browserInfo;
    req.session.userId = user.id;

    //* Create JWT Token
    const token = jwt.sign(
      { userId: user.id, browserInfo: browserInfo },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30m' }
    );

    //   //* httpOnly: true add to cookie for security
    req.flash('log', 'Login successfull');

    //* Add token & user to locals for demo purposes
    req.app.locals.token = token;
    req.app.locals.user = user;
    req.app.locals.created = true;

    //* Set token to client's cookie
    res.cookie('jwt', token, { httpOnly: true });
    res.status(200).redirect('/');
  } catch (err) {
    req.flash('error', 'Login Failed');
    res.status(400).redirect('/login');
  }
};

//* Logout & delete session
export const logout: RequestHandler = (req, res) => {
  req.app.locals.logout = true;
  req.app.locals.created = false;
  req.session.destroy(() => {
    res.clearCookie('connect.sid', { path: '/' });
    res.redirect('/login');
  });
};
