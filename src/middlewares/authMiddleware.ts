import jwt from 'jsonwebtoken';
import User from '../models/User';
import { RequestHandler } from 'express';

//*Check & verify jwt validation
export const requireAuth: RequestHandler = async (req, res, next) => {
  const token = req.cookies.jwt;
  try {
    const decoded = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    );
    req.body = decoded;
    console.log(req.body.decoded);
    next();
  } catch (err: any) {
    req.flash('jwt', 'Invalid or expired token, please login');
    req.session.userId = '';
    return res.redirect('/login');
  }
};
