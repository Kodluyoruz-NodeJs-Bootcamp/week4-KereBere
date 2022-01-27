const router = require('express').Router();
import {
  getIndexPage,
  getDashboardPage,
  getLoginPage,
  getRegisterPage,
} from '../controllers/pageController';
import { requireAuth } from '../middlewares/authMiddleware';
import { redirect } from '../middlewares/redirectMiddleware';

router.get('/', getIndexPage);
router.route('/register').get(redirect, getRegisterPage);
router.route('/login').get(redirect, getLoginPage);
router.get('/dashboard', requireAuth, getDashboardPage);

export default router;
