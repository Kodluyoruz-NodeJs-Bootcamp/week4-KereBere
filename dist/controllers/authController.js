"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//* JWT token - 3 days
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15s',
    });
};
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { name, username, email, password, password2 } = req.body;
        const user = yield User_1.default.create(req.body);
        const token = createToken(user._id);
        req.session.userID = user._id;
        req.session.token = token;
        //* httpOnly: true add to cookie for security
        res.cookie('jwt', token);
        res.status(201).redirect('/');
    }
    catch (err) {
        const errors = (0, express_validator_1.validationResult)(req);
        console.log(errors);
        for (let i = 0; i < errors.array().length; i++) {
            req.flash('error', `${errors.array()[i].msg}`);
        }
        res.status(400).redirect('/auth');
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        User_1.default.findOne({ email }, (err, user) => {
            if (user) {
                bcryptjs_1.default.compare(password, user.password, (err, same) => {
                    if (same) {
                        req.session.userID = user._id;
                        const token = createToken(user._id);
                        //* httpOnly: true add to cookie for security
                        res.cookie('jwt', token);
                        req.session.token = token;
                        res.status(200).redirect('/');
                    }
                    else {
                        req.flash('error', 'Wrong Password');
                        res.status(400).redirect('/auth');
                    }
                });
            }
            else {
                req.flash('error', 'User does not exist');
                res.status(400).redirect('/auth');
            }
        });
    }
    catch (err) {
        res.status(400).json({ status: 'fail', err });
    }
});
exports.login = login;
const logout = (req, res) => {
    req.session.destroy(() => {
        res.cookie('jwt', '', { maxAge: 1 });
        res.redirect('/auth');
    });
};
exports.logout = logout;
//# sourceMappingURL=authController.js.map