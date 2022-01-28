import { RequestHandler } from 'express';
export const  redirect : RequestHandler =  (req, res, next) => {
  if (req.session.userId) {
    req.flash('error', 'You are already logged in');

    return res.redirect('/');
  }
  next();
};
 