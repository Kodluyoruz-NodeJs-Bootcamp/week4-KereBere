"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
const pageController_1 = require("../controllers/pageController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const redirectMiddleware_1 = require("../middlewares/redirectMiddleware");
router.get('/', pageController_1.getIndexPage);
router.route('/auth').get(redirectMiddleware_1.redirect, pageController_1.getAuthPage);
router.get('/dashboard', authMiddleware_1.requireAuth, pageController_1.getDashboardPage);
exports.default = router;
//# sourceMappingURL=pageRoute.js.map