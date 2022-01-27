"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// DB CONNECTION
const mongoose_1 = __importDefault(require("mongoose"));
exports.connect = () => {
    mongoose_1.default
        .connect(process.env.MONGO_URI)
        .then(() => {
        console.log('Database connection successful');
    })
        .catch((error) => {
        console.log('Database connection failed !');
        console.error(error);
        process.exit(1);
    });
};
//# sourceMappingURL=database.js.map