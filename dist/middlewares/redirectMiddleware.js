"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirect = void 0;
const redirect = (req, res, next) => {
    if (req.session.userID) {
        return res.redirect('/');
    }
    next();
};
exports.redirect = redirect;
//# sourceMappingURL=redirectMiddleware.js.map