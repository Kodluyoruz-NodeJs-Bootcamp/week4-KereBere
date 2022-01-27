import jwt from 'jsonwebtoken';
import User from '../models/User';
import { RequestHandler } from 'express';

//*Check & verify jwt validation
export const requireAuth: RequestHandler = (req, res, next) => {
  const token = req.cookies.jwt;
  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    );
    req.body = decoded;
    next();
  } catch (err: any) {
    req.flash('error', err.message);
    req.session.userID = '';
    res.redirect('/login');
  }
};
