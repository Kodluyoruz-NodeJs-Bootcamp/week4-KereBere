"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authController_1 = require("../controllers/authController");
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
router.route('/register').post([
    (0, express_validator_1.body)('name').not().isEmpty().withMessage('Please enter your name'),
    (0, express_validator_1.body)('username').not().isEmpty().withMessage('Please enter your username'),
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('Please enter your email')
        .custom((userEmail) => {
        return User_1.default.findOne({ email: userEmail }).then((user) => {
            if (user) {
                return Promise.reject('Email is already taken');
            }
        });
    }),
    (0, express_validator_1.body)('password').not().isEmpty().withMessage('Please add a passwprd'),
], authController_1.register);
router.post('/login', authController_1.login);
router.route('/logout').get(authController_1.logout);
exports.default = router;
//# sourceMappingURL=authRoute.js.map