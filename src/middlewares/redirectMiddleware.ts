import { RequestHandler } from 'express';
export const  redirect : RequestHandler =  (req, res, next) => {
  if (req.session.userID) {
    return res.redirect('/');
  }
  next();
};
 