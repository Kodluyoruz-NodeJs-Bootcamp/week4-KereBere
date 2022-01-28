import { RequestHandler } from 'express';
let errors: Array<String> = [];
export const getIndexPage: RequestHandler = (req, res) => {
  res.status(200).render('index', {
    pageName: 'Homepage',
    // token: req.session.token,
  });
};

// export const getAuthPage: RequestHandler = (req, res) => {
//   res.status(200).render('auth', {
//     pageName: 'Auth',
//     errors,
//   });
// };
export const getRegisterPage: RequestHandler = (req, res) => {
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
  res.status(200).render('dashboard', {
    pageName: 'Dashboard',
  });
};
