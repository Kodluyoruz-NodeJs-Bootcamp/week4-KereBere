import { RequestHandler } from 'express';

export const getIndexPage: RequestHandler = (req, res) => {
  res.app.locals.created = false;
  res.app.locals.logout = false;
  res.status(200).render('index', {
    pageName: 'Homepage',
  });
};
export const getRegisterPage: RequestHandler = (req, res) => {
  res.app.locals.logout = false;
  res.status(200).render('register', {
    pageName: 'Sign Up',
    errors,
  });
};
export const getLoginPage: RequestHandler = (req, res) => {
  res.status(200).render('login', {
    pageName: 'Sign In',
    created: false,
  });
};

export const getDashboardPage: RequestHandler = (req, res) => {
  const token = req.app.locals.token || 'usrerfesfes';
  const user = req.app.locals.user || 'usrerfesfes';
  res.status(200).render('dashboard', {
    pageName: 'Dashboard',
    user: user,
    token: token,
  });
};

let errors: Array<String> = [];
