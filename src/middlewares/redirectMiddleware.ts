import { RequestHandler } from 'express';

//* Redirect to homepage if a logged in user tries to login or register
export const  redirect : RequestHandler =  (req, res, next) => {
  if (req.session.userId) {
    req.flash('error', 'You are already logged in');
    return res.redirect('/');
  }
  next();
};
 