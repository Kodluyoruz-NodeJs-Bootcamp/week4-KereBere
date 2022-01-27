"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//*Check & verify jwt validation
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.body = decoded;
        next();
    }
    catch (err) {
        req.flash('error', err.message);
        req.session.userID = "";
        res.redirect('/auth');
    }
};
exports.requireAuth = requireAuth;
//# sourceMappingURL=authMiddleware.js.map