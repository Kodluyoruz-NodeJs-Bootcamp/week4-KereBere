import jwt, { JwtPayload } from 'jsonwebtoken';
import { RequestHandler } from 'express';

//*Check & verify jwt validation
export const requireAuth: RequestHandler = (req, res, next) => {
  const token = req.cookies.jwt;
  const browserInfo = req.session.browserInfo;
  const userId = req.session.userId;
  try {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
      (err: Error, decodedToken: JwtPayload) => {
        if (
          decodedToken.browserInfo === browserInfo &&
          decodedToken.userId === userId
        ) {
          next();
        } else {
          res.app.locals.created = false;
          res.app.locals.logout = false;
          req.flash('jwt', 'Invalid or expired token, please login');
          return res.redirect('/login');
        }
      }
    );
  } catch (err: any) {
    req.flash('jwt', 'Invalid or expired token, please login');
    return res.redirect('/login');
  }
};
