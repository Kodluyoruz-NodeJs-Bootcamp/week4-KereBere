"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const express_session_1 = __importDefault(require("express-session"));
const pageRoute_1 = __importDefault(require("./routes/pageRoute"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
//* Connect to DB
require('./config/database').connect();
//Middlewares
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: 'Speak friend and enter',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60,
    },
}));
app.use((0, connect_flash_1.default)());
app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});
//* Template engine settings
app.set('view engine', 'ejs');
//* Router
app.use('/', pageRoute_1.default);
app.use('/auth', authRoute_1.default);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Started in port ${PORT}`);
});
//# sourceMappingURL=app.js.map