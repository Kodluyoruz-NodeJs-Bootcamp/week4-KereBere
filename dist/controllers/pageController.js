"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardPage = exports.getAuthPage = exports.getIndexPage = void 0;
const getIndexPage = (req, res) => {
    res.status(200).render('index', {
        pageName: 'Homepage',
        token: req.session.token,
    });
};
exports.getIndexPage = getIndexPage;
const getAuthPage = (req, res) => {
    res.status(200).render('auth', {
        pageName: 'Auth',
    });
};
exports.getAuthPage = getAuthPage;
const getDashboardPage = (req, res) => {
    res.status(200).render('dashboard', {
        pageName: 'Dashboard',
    });
};
exports.getDashboardPage = getDashboardPage;
//# sourceMappingURL=pageController.js.map