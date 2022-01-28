import { RequestHandler } from 'express';
let errors: Array<String> = [];
export const getIndexPage: RequestHandler = (req, res) => {
  res.app.locals.created = false;
  res.app.locals.logout = false;
  res.status(200).render('index', {
    pageName: 'Homepage',
  });
};

// export const getAuthPage: RequestHandler = (req, res) => {
//   res.status(200).render('auth', {
//     pageName: 'Auth',
//     errors,
//   });
// };
export const getRegisterPage: RequestHandler = (req, res) => {
  res.app.locals.logout = false;
  res.status(200).render('register', {
    pageName: 'Sign Up',
    errors,
  });
};
export const getLoginPage: RequestHandler = (req, res) => {
  res.status(200).render('login', {
    pageName: 'Login',
    errors,
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
